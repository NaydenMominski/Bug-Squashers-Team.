'use strict';

SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': '/libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '/libs/systemjs-plugin-babel/systemjs-babel-browser.js',

        // scripts
        'chat': '/static/js/chat.js',
        'googlemap': '/static/js/googlemap-api.js',
        'functions': '/static/js/functions.js',
        'facebook': '/static/js/facebook.js',
        'dropdown': '/static/js/dropdown.js',
        'service': '/static/js/service.js',
        'pagination': '/static/js/plugins/pagination.js',
        'paging': '/static/js/paging.js',
        'loaderlib': '/static/js/plugins/loader.js',
        'loader': '/static/js/loading.js',
    }
});
