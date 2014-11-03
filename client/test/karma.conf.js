// Karma configuration
// Generated on Mon Sep 08 2014 09:58:24 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    plugins: [
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-ng-html2js-preprocessor'
    ],


      ngHtml2JsPreprocessor: {
          // the name of the Angular module to create
          moduleName: "htmlTemplates"
      },


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'bower_components/angular/angular.js',
        'bower_components/angular*/*.min.js',
        'bower_components/angular-mocks/*.js',
        'bower_components/angular-payments/lib/*.min.js',
        'scripts/app.module.js',
        'scripts/utilities/ng-ab/ng-ab.module.js',
//        'scripts/button/general.js',
        'scripts/app.*.js',
        'scripts/**/*.directive.js',
        'scripts/**/*.controller.js',
        'scripts/**/*.service.js',
        'scripts/**/*.spec.js',
        'scripts/**/*.html'
    ],


    // list of files to exclude
    exclude: [
        'scripts/button/button.spec.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '**/*.html': ['ng-html2js']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
