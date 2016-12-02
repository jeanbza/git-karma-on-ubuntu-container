# karma-in-docker

# Run tests locally

1. `npm install`
1. `npm test`

# Run tests in docker

1. `npm install`
1. `npm test`
1. `docker build . -t karma-docker`
1. `docker run -it -v ~/workspace/git-karma-on-ubuntu-container:/karma karma-docker`
1. Run in container:

    ```
    service dbus restart
    xvfb-run chromedriver &
    cd /karma
    rm -rf node_modules
    npm install
    TEST_ENV=CI npm test
    ```

# What are the problems this repo is trying to solve?

- Provide a basic karma + babel + react example that runs on docker containers
- The [karma-chrome-launcher](https://github.com/karma-runner/karma-chrome-launcher) hangs trying to start google-chrome (it does so directly; not through `chromedriver`). We don't know why this is - even with maximum logging (see below) we get no useful information
- Running `google-chrome` through the [karma-script-launcher](https://github.com/karma-runner/karma-script-launcher) hangs - again, we were unable to find out why. We think this and the [karma-chrome-launcher](https://github.com/karma-runner/karma-chrome-launcher) is related to Karma's use of [child_process.spawn](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) [[1]](https://github.com/karma-runner/karma/blob/8e2cfab5e97033a17edbde412485d682d153d5d1/lib/launchers/process.js#L63) [[2]](https://github.com/karma-runner/karma/blob/8e2cfab5e97033a17edbde412485d682d153d5d1/lib/launchers/process.js#L141) [[3]](https://github.com/karma-runner/karma/blob/8e2cfab5e97033a17edbde412485d682d153d5d1/lib/launchers/process.js#L138)
- [We know that chromedriver + acceptance tests work headlessly in a very similar container](http://engineering.pivotal.io/post/headless-ui-testing-with-go-agouti-and-chrome/) (again - the only different we see is that [karma-chrome-launcher](https://github.com/karma-runner/karma-chrome-launcher) and co get run as a separate process via [child_process.spawn](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options))

So...

Our solution is to start chromedriver in its own thread and use the [karma-script-launcher](https://github.com/karma-runner/karma-script-launcher) JUST to make chromedriver (who is not living in the [child_process.spawn](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) process) navigate to the page that [karma passes to our script](https://github.com/karma-runner/karma-script-launcher/blame/a501ba571a08f13346218900f50f844c967d650d/README.md#L10-L11)

# Debugging

- Add `--log-level debug` to your `test` script in `package.json` to get more karma logging
    - Karma [suppresses the output of launchers](https://github.com/karma-runner/karma/blob/master/lib/launchers/process.js#L140-L148) (so you can not see why google-chrome is failing!)]
- `chromedriver --verbose` is a good source of information
- Karma doesn't print the output of your launcher (chrome, script, firefox, whatever) because of [this piece of code](https://github.com/karma-runner/karma/blob/8e2cfab5e97033a17edbde412485d682d153d5d1/lib/launchers/process.js#L140-L148). This doesn't seem to be configurable. You can replace that bit of code with:

    ```
    var spawnWithoutOutput = function () {
      var proc = spawn.apply(null, arguments)
      proc.stdout.pipe(process.stdout)
      proc.stderr.pipe(process.stderr)

      return proc
    }

    ProcessLauncher.call(launcher, spawnWithoutOutput, require('../temp_dir'), timer)
    ```
