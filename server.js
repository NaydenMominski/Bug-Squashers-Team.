/* eslint no-console: */
const { getApp } = require('./app/app');
const port = 3005;

getApp({ connectionString: 'mongodb://localhost/PropertyDb' })
    .then((app) =>
        app.listen(port, () =>
            console.log(`Magic happens at :${port}`)));
