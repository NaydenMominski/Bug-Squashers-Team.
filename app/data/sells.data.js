const { ObjectID } = require('mongodb');

const getData = (db) => {
    const collection = db.collection('sells');
    return {
        getAll(queries) {
            return collection
                .find(queries.query)
                .sort(queries.orderBy)
                // .skip(queries.pagesize * (queries.page - 1))
                // .limit(queries.pagesize)
                .toArray()
                .then((sells) => {
                    return sells.map((sell) => {
                        sell.id = sell._id;
                        return sell;
                    });
                });
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
            return collection.insert(sell)
                .then((result) => {
                    sell.id = sell._id;
                    return sell;
                });
        },
        update(sell, editedSell) {
            return collection.updateOne({
                    _id: sell._id,
                }, editedSell)
                .then((result) => {
                    sell.id = sell._id;
                    return sell;
                });
        },
        remove(sell) {
            // console.log(sell);

            return collection.remove({
                _id: sell._id,
            });
        },
    };
};

module.exports = { getData };
