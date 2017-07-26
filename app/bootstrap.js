/* globals __dirname */
/* eslint new-cap: ["error", { "capIsNew": false }] */
/* globals process */
/* eslint-disable no-process-env */

const path = require('path');

const express = require('express');
const expressValidator = require('express-validator');
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const socketEvents = require('../utils/socket');

const logger = require('./logger/');

const bootstrapApp = () => {
    const app = express();

    const server = http.Server(app);
    const socket = socketio(server);

    app.set('view engine', 'pug');

    app.use(bodyParser.urlencoded({
        extended: false,
    }));

    app.use(expressValidator({
        errorFormatter: function(param, msg, value) {
            const namespace = param.split('.');
            const root = namespace.shift();
            let formParam = root;

            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value,
            };
        },
    }));

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

    socketEvents(socket).socketConfig();
    // app.use(flash());

    return app;
};


module.exports = { bootstrapApp };
