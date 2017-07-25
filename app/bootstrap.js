/* globals __dirname */

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const logger = require('./logger/');

const bootstrapApp = () => {
    const app = express();

    app.set('view engine', 'pug');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(flash());

    app.use('/static', express.static(path.join(__dirname, '../static')));
    app.use('/libs', express.static(
        path.join(__dirname, '../node_modules/font-awesome')));

    app.use('/css', express
        .static(path.join(__dirname,
            '../node_modules/font-awesome/css')));
    app.use('/js', express
        .static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
    app.use('/js', express
        .static(path.join(__dirname, '../node_modules/jquery/dist')));
    app.use('/css', express
        .static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));

    logger.attachTo(app);

    app.use(cookieParser());
    // app.use(flash());

    return app;
};

module.exports = { bootstrapApp };
