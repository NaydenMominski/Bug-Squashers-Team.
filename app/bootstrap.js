/* eslint new-cap: ["error", { "capIsNew": false }] */
/* eslint-disable no-process-env */

const bootstrapApp = (data, db) => {
    const express = require('express');
    const app = express();

    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    // const cors = require('cors');
    const cookieParser = require('cookie-parser');
    // const socketEvents = require('../utils/socket');
    const logger = require('./logger/');

    require('./config').baseConfig(app);
    require('./config').authConfig(app, data, db, 'Bug Squashers');
    require('./config').chatConfig(io, data).socketConfig();

    // socketEvents(socket).socketConfig();

    logger.attachTo(app);

    app.use(cookieParser());

    return app;
};


module.exports = { bootstrapApp };
