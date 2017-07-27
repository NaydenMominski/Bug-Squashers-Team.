/* eslint new-cap: ["error", { "capIsNew": false }] */
/* eslint-disable no-process-env */

const initApp = (data, db) => {
    const express = require('express');
    const app = express();
    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    // const cors = require('cors');
    const cookieParser = require('cookie-parser');
    const logger = require('./logger/');

    require('./config').baseConfig(app);
    require('./config').authConfig(app, data, db, 'Bug Squashers');
    // require('./config').chatConfig(io, data).socketConfig();

    require('../app/routers').attachTo(app, data);

    logger.attachTo(app);

    app.use(cookieParser());

    return Promise.resolve(server);
};


module.exports = { initApp };
