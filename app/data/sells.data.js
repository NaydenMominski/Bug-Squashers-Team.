const { ObjectID } = require('mongodb');

const getData = (db) => {
    const collection = db.collection('sells');
    return {
        getAll(req, res) {
            const location = req.query.province || 'All';
            const min = parseInt(req.query.price_from, 10) || 0;
            const max = parseInt(req.query.price_to, 10) || 9999999999;
            const price = { '$gte': min, '$lt': max };
            const orderBy = req.query.order_by === 'price' ? { price: 1 } : { date: -1 };
            const page = parseInt(req.query.page, 10) || 1;
            const pagesize = parseInt(req.query.size, 10) || 10;
            const query = location === 'All' ? { price } : { location, price };

            return collection
                .find(query)
                .sort(orderBy)
                .skip(pagesize * (page - 1))
                .limit(pagesize)
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
