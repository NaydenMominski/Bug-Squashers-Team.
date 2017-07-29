const getData = (db) => {
    const collectionSells = db.collection('sells');
    const collectionRents = db.collection('rents');
    const collectionUsers = db.collection('users');
    const collectionMessages = db.collection('messages');
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
            return collectionUsers.find()
                .sort({ 'online': -1, 'firstname': 1 })
                .toArray()
                .then((users) => {
                    return users;
                });
        },
        getAllMessages() {
            return collectionUsers
                .find()
                .sort({ 'online': -1, 'firstname': 1 })
                .toArray()
                .then((users) => {
                    return users;
                });
        }
    };
};

module.exports = { getData };
