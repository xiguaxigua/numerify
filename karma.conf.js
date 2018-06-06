module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    reporters: ['spec'],
    files: [
      'lib/index.umd.min.js',
      'lib/plugins/bps.umd.min.js',
      'lib/plugins/bytes.umd.min.js',
      'lib/plugins/currency.umd.min.js',
      'lib/plugins/exponential.umd.min.js',
      'lib/plugins/ordinal.umd.min.js',
      'lib/plugins/time.umd.min.js',
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
