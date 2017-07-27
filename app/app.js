const { connect } = require('./db');
const { initData } = require('./data');

const { bootstrapApp } = require('./bootstrap');

const routers = require('./routers');

const async = require('../utils/async');

module.exports = {
    getApp(config) {
        // const app = bootstrapApp();

        return async()
            .then(() => connect(config.connectionString))
            .then((db) => {
                const data = initData(db);
                const app = bootstrapApp(data, db);
                // require('./auth')(app, data, db, 'Bug Squashers');

                routers.attachTo(app, data);

                return app;
            });
    },
};
