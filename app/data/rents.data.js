const { ObjectID } = require('mongodb');

const getData = (db) => {
    const collection = db.collection('rents');
    return {
        getAll(queries) {
            try {
                return collection
                    .find(queries.query)
                    .sort(queries.orderBy)
                    .skip(queries.pagesize * (queries.page - 1))
                    .limit(queries.pagesize)
                    .toArray()
                    .then((rents) => {
                        return rents.map((rent) => {
                            rent.id = rent._id;
                            return rent;
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
                return Promise.reject('Invalid id');
            }
        },
        lastRents(lastRents) {
            try {
                return collection
                    .find({})
                    .sort({ date: -1 })
                    .limit(lastRents)
                    .toArray()
                    .then((rents) => {
                        return rents.map((rent) => {
                            rent.id = rent._id;
                            return rent;
                        });
                    });
            } catch (err) {
                return Promise.reject('Invalid id');
            }
        },
        getById(id) {
            try {
                return collection.findOne({ _id: new ObjectID(id) })
                    .then((rent) => {
                        if (!rent) {
                            return null;
                        }

                        rent.id = rent._id;
                        return rent;
                    });
            } catch (err) {
                return Promise.reject('Invalid id');
            }
        },
        create(rent) {
            try {
                return collection.insert(rent)
                    .then((result) => {
                        rent.id = rent._id;
                        return rent;
                    });
            } catch (err) {
                return Promise.reject('Invalid rent');
            }
        },
        update(rent, editedrent) {
            try {
                return collection.updateOne({
                        _id: rent._id,
                    }, editedrent)
                    .then((result) => {
                        rent.id = rent._id;
                        return rent;
                    });
            } catch (err) {
                return Promise.reject('Invalid update');
            }
        },
        remove(rent) {
            try {
                return collection.remove({
                    _id: rent._id,
                });
            } catch (err) {
                return Promise.reject('Error the rent i not removed');
            }
        },
    };
};

module.exports = { getData };
