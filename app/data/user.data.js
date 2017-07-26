const getData = (db) => {
    const collectionSells = db.collection('sells');
    const collectionRents = db.collection('rents');
    return {
        getUserAllSells(curentUser) {
            return collectionSells.find({
                    'user.username': curentUser,
                })
                .toArray()
                .then((sells) => {
                    return sells;
                });
        },
        getUserAllRents(curentUser) {
            return collectionRents.find({
                    'user.username': curentUser,
                })
                .toArray()
                .then((sells) => {
                    return sells;
                });
        },
    };
};

module.exports = { getData };
