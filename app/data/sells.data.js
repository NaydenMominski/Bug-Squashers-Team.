const { ObjectID } = require('mongodb');

const getData = (db) => {
    const collection = db.collection('sells');
    return {
        getAll(queries) {
            try {
                return collection
                    .find(queries.query)
                    .sort(queries.orderBy)
                    .skip(queries.pagesize * (queries.page - 1))
                    .limit(queries.pagesize)
                    .toArray()
                    .then((sells) => {
                        return sells.map((sell) => {
                            sell.id = sell._id;
                            return sell;
                        });
                    });
            } catch (err) {
                return Promise.reject('Invalid queryes');
            }
        },
        getAllCount(queries) {
            try {
                return collection
                    .find(queries.query)
                    .count();
            } catch (err) {
                return Promise.reject('Invalid queryes');
            }
        },
        getById(id) {
            try {
                return collection.findOne({ _id: new ObjectID(id) })
                    .then((sell) => {
                        if (!sell) {
                            return null;
                        }

                        sell.id = sell._id;
                        return sell;
                    });
            } catch (err) {
                return Promise.reject('Invalid id');
            }
        },
        create(sell) {
            try {
                return collection.insert(sell)
                    .then(() => {
                        sell.id = sell._id;
                        return sell;
                    });
            } catch (err) {
                return Promise.reject('Invalid sell');
            }
        },
        update(sell, editedSell) {
            try {
                return collection.updateOne({
                        _id: sell._id,
                    }, editedSell)
                    .then(() => {
                        sell.id = sell._id;
                        return sell;
                    });
            } catch (err) {
                return Promise.reject('Invalid update');
            }
        },
        remove(sell) {
            try {
                return collection.remove({
                    _id: sell._id,
                });
            } catch (err) {
                return Promise.reject('Error the sell i not removed');
            }
        },
    };
};

module.exports = { getData };
