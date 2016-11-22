# karma-in-docker

1. `npm install`
1. `npm test`
1. `docker build . -t karma-docker`
1. `docker run -it -v $(echo /Users/pivotal/workspace/karma-in-docker):/karma karma-docker`
1. Run in container:

    ```
    service dbus restart
    xvfb-run chromedriver &
    cd /karma
    rm -rf node_modules
    npm install
    npm test
    ```

# Debugging

- Add `--log-level debug` to your `test` script in `package.json` to get more karma logging
    - Karma [suppresses the output of launchers](https://github.com/karma-runner/karma/blob/master/lib/launchers/process.js#L140-L148) (so you can not see why google-chrome is failing!)