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
            return collectionUsers
                .find()
                .sort({ 'online': -1, 'firstname': 1 })
                .toArray()
                .then((users) => {
                    return users;
                });
        },
        getAllAgents() {
            return collectionUsers
                .find({ 'usertype': 'Agency' })
                .toArray()
                .then((users) => {
                    return users;
                });
        },

        getAllMessages() {
            return collectionMessages
                .find()
                .sort({ 'fromUserId': 1, 'toUserId': 1, 'timestamp': 1 })
                .toArray()
                .then((messages) => {
                    console.log(messages);
                    return messages;
                });
        },
    };
};

module.exports = { getData };
