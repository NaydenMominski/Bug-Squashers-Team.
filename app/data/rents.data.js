const { ObjectID } = require('mongodb');

const getData = (db) => {
    const collection = db.collection('rents');
    return {
        getAll(queries) {
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
        },
        getAllCount(queries) {
            return collection
                .find(queries.query)
                .count();
        },
        lastRents(n) {
            return collection
                .find({})
                .sort({ date: -1 })
                .limit(n)
                .toArray()
                .then((rents) => {
                    return rents.map((rent) => {
                        rent.id = rent._id;
                        return rent;
                    });
                });
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
            return collection.insert(rent)
                .then((result) => {
                    rent.id = rent._id;
                    return rent;
                });
        },
        update(rent, editedrent) {
            return collection.updateOne({
                    _id: rent._id,
                }, editedrent)
                .then((result) => {
                    rent.id = rent._id;
                    return rent;
                });
        },
        remove(rent) {
            // console.log(rent);

            return collection.remove({
                _id: rent._id,
            });
        },
    };
};

module.exports = { getData };
