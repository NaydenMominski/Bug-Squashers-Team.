/* eslint-disable no-console */

const { MongoClient } = require('mongodb');

const connect = (connectionString) => {
    return MongoClient.connect(connectionString)
        .then((db) => {
            console.log('Databases connected');
            return db;
        });
};

module.exports = { connect };
