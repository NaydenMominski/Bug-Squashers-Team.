// const { ObjectID } = require('mongodb');
const getData = (db) => {
    const collection = db.collection('sells');
    return {
        lastSells(lastSells) {
            return collection
                .find({})
                .sort({ date: -1 })
                .limit(lastSells)
                .toArray()
                .then((sells) => {
                    return sells.map((sell) => {
                        sell.id = sell._id;
                        return sell;
                    });
                });
        },

    };
};

module.exports = { getData };
