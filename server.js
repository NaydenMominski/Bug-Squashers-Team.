const { getApp } = require('./app/app');

const port = 3005;
// ----mlab mongodb------
// getApp({ connectionString: 'mongodb://nodeproject:project@ds161262.mlab.com:61262/nodeproject' })

getApp({ connectionString: 'mongodb://localhost/PropertyDb' })
    .then((app) =>
        app.listen(port, () =>
            // eslint-disable-next-line no-console
            console.log(`Magic happens at :${port}`)));