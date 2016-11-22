const path = require('path')

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
    browsers: [path.join(__dirname, 'chrome_script.sh')],
    singleRun: false,
    concurrency: Infinity
  })
}
