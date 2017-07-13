const { getApp } = require('./app/app');

const port = 3005;

getApp({ connectionString: 'mongodb://localhost/PropertyDb' })
    .then((app) =>
        app.listen(port, () =>
            // eslint-disable-next-line no-console
            console.log(`Magic happens at :${port}`)));
