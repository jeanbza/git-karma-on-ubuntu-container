module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['tests/*.js'],
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['my_chrome'],
    singleRun: false,
    concurrency: Infinity,
    customLaunchers: {
      my_chrome: {
        base: 'Chrome',
        flags: ['--disable-gpu', '--no-sandbox']
      }
    }
  })
}
