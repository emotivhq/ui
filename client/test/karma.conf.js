/**
 * Created by stuart on 4/16/14.
 */

module.exports = function(config) {
    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        plugins: ['karma-jasmine', 'karma-chrome-launcher', 'karma-coverage'],
        browsers: ['Chrome'],

        files: [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/angular-easyfb/angular-easyfb.min.js',
            'bower_components/angular-payments/lib/angular-payments.min.js',
            'scripts/app.js',
            'scripts/*.js',
            'test/system/*.spec.js',
            'test/unit/*.spec.js'
        ],

        preprocessors: {'scripts/*.js': ['coverage']},
        coverageReporter: { type : 'html', dir : 'coverage/' }

    });
};