const { ObjectID } = require('mongodb');

const getData = (db) => {
    const collection = db.collection('sells');
    return {
        getAll(req, res) {
            let property = req.query.p_type || 'All';

            if (property === 'All') {
                property = { $in: ['Apartament', 'House'] };
            }

            const min = +req.query.price_from || 0;
            const max = +req.query.price_to || 9999999999;
            const price = { '$gte': min, '$lt': max };
            const orderBy = req.query.order_by === 'price' ? { price: 1 } : { date: 1 };

            const query = {
                property,
                price,
            };

            return collection.find(query).sort(orderBy)
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
        create(user, sell, sellimages) {
            const userdb = {
                id: user.id,
                username: user.username,
                usertype: user.usertype,
                phone: user.phone,

            };

            sell.avatar = sellimages ? sellimages.filename : 'default.png';
            sell.user = userdb;
            sell.date = new Date();

            return collection.insert(sell)
                .then((result) => {
                    sell.id = sell._id;
                    return sell;
                });
        },
        update(user, sell, editedSell, sellimages) {
            const userdb = {
                id: user.id,
                username: user.username,
                usertype: user.usertype,
                phone: user.phone,
            };
            editedSell.avatar = sellimages ? sellimages.filename : 'default.png';
            editedSell.user = userdb;
            editedSell.date = new Date();

            return collection.updateOne({
                    _id: sell._id,
                }, editedSell)
                .then((result) => {
                    sell.id = sell._id;
                    return sell;
                });
        },
        remove(sell) {
            console.log(sell);

            return collection.remove({
                _id: sell._id,
            });
        },
    };
};

module.exports = { getData };
