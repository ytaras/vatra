module.exports = function(config) {
    config.set({

        //basePath: 'bower_components',
        // frameworks to use
        frameworks: ['mocha', 'browserify', 'should'],

        // list of files / patterns to load in the browser
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/**/*.coffee',
            'spec/**/*.coffee'
        ],

        reporters: ['progress'],

        port: 9876,

        colors: true,

        autoWatch: true,

        browsers: ['PhantomJS'],

        preprocessors: {
            'src/**/*.coffee': ['coffee'],
            'spec/**/*.coffee': ['browserify']
        },
        browserify: {
            transform: ['coffeeify'],
            extensions: ['.coffee']
        }

    });
};