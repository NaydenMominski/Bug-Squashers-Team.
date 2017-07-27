/* globals process */
/* eslint-disable no-process-env */
/* eslint no-console: */
const { getApp } = require('./app/app');
const port = process.env.PORT || 3005;

getApp({ connectionString: 'mongodb://localhost/PropertyDb' })
    .then((app) =>
        app.listen(port, () =>
            console.log(`Magic happens at :${port}`)));
