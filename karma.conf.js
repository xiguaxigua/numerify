module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    reporters: ['spec'],
    files: [
      'lib/index.umd.min.js',
      'test/**/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  })
}
