/* globals __dirname */
/* eslint new-cap: ["error", { "capIsNew": false }] */
/* globals process */
/* eslint-disable no-process-env */

const path = require('path');

const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const logger = require('./logger/');

const bootstrapApp = () => {
    const app = express();

    const server = http.Server(app);
    const socket = socketio(server);

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

class Server {
    constructor() {
        this.port = process.env.PORT || 3005;
        this.host = `localhost`;

        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
    }

}

module.exports = { bootstrapApp };
