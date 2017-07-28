const getData = (db) => {
    const collectionSells = db.collection('sells');
    const collectionRents = db.collection('rents');
    const collectionUsers = db.collection('users');
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
        getUserAllUsers() {
            return collectionUsers.find({})
                .toArray()
                .then((users) => {
                    return users;
                });
        },
    };
};

module.exports = { getData };
