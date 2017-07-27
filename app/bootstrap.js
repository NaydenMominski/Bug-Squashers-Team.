/* eslint new-cap: ["error", { "capIsNew": false }] */
/* eslint-disable no-process-env */

const bootstrapApp = () => {

    const express = require('express');
    const app = express();

    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    // const cors = require('cors');
    const cookieParser = require('cookie-parser');
    // const socketEvents = require('../utils/socket');

    const logger = require('./logger/');

    require('./config').baseConfig(app);

    // socketEvents(socket).socketConfig();

    logger.attachTo(app);

    app.use(cookieParser());

    return app;
};


module.exports = { bootstrapApp };
