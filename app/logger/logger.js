/* globals __dirname */

const path = require('path');
const fs = require('fs');

const morgan = require('morgan');

const attachTo = (app, config = {}) => {
    const logDirectory = config.logDirectory || path.join(__dirname, 'log');

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }

    const logStream = fs.createWriteStream(
        path.join(logDirectory, 'app.log'));

    app.use(morgan('combined', { stream: logStream }));
};

module.exports = { attachTo };
