// Karma configuration

module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            'public/lib/angular/angular.js',
            'public/lib/angular-socket-io/socket.js',
            'public/lib/angular-socket-io/mock/socket-io.js',
            'public/lib/angular-mocks/angular-mocks.js',
            'public/javascripts/*.js',
            'test/jasmine/*.js'
        ],

        port: 9876,
        colors: true,

        logLevel: config.LOG_INFO,

        browsers: ['Chrome'],
        frameworks: ['jasmine'],

        captureTimeout: 60000,

        autoWatch: true,
        singleRun: false
    });
};