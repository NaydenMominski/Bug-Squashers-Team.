const { ObjectID } = require('mongodb');

const getData = (db) => {
    const collection = db.collection('sells');
    return {
        getAll() {
            return collection.find({})
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
        create(sell, sellimages) {
            const newsell = {
                headline: sell.headline,
                property: sell.property,
                location: sell.location,
                price: sell.price,
                size: sell.size,
                bedrooms: sell.bedrooms,
                bathrooms: sell.bathrooms,
                floor: sell.floor,
                buildingfloors: sell.buildingfloors,
                lift: sell.lift,
                garden: sell.garden,
                description: sell.description,
                avatar: sellimages ? sellimages.filename : 'default.png',
            };
            return collection.insert(newsell)
                .then((result) => {
                    newsell.id = newsell._id;
                    return newsell;
                });
        },
    };
};

module.exports = { getData };
