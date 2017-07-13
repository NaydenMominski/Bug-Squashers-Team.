const { MongoClient } = require('mongodb');

const connect = (connectionString) => {
    return MongoClient.connect(connectionString);
};

module.exports = { connect };
