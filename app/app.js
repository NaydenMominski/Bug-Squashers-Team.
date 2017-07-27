const { connect } = require('./db');
const { initData } = require('./data');

const { bootstrapApp } = require('./bootstrap');

const routers = require('./routers');

const async = require('../utils/async');

module.exports = {
    getApp(config) {
        return async()
            .then(() => connect(config.connectionString))
            .then((db) => {
                const data = initData(db);
                const app = bootstrapApp(data, db);

                routers.attachTo(app, data);

                return app;
            });
    },
};
