/* globals process */
/* eslint-disable no-process-env */
/* eslint no-console: */
const port = process.env.PORT || 3005;
const async = require('./utils/async');

const db = require('./app/db');

async()
.then(() => db.connect('mongodb://localhost/PropertyDb'))
    // .then(() => db.connect('mongodb://nodeproject:project@ds161262.mlab.com:61262/nodeproject'))
    .then((database) => {
        const data = require('./app/data').initData(database);
        return require('./app').initApp(data, database);
    })
    .then((app) => {
        return app.listen(port, () => {
            console.log(`Magic happens at :${port}`);
        });
    });
