const { ObjectID } = require('mongodb');

const getData = (db) => {
    const usersDb = db.collection('users');
    const messagesDb = db.collection('messages');
    return {
        userNameCheck(id) {
            return usersDb.findOne({ _id: new ObjectID(id) })
                .then((user) => {
                    if (!user) {
                        return null;
                    }

                    user.id = user._id;
                    return user;
                });
        },
        login(data) {
            usersDb
                .findAndModify(data, [], { $set: { online: 'Y' } });
        },
        userSessionCheck(data) {
            return usersDb
                .findOne({ _id: new ObjectID(data.id), online: 'Y' })
                .then((user) => {
                    if (!user) {
                        return null;
                    }

                    return user;
                });
        },
        getUserInfo(userId, callback) {
            return usersDb.findOne({ _id: new ObjectID(userId) },
                (err, result) => {
                    callback(err, result);
                });
        },
        // update the socket id of single user
        addSocketId(data, callback) {
            usersDb
                .update({
                        _id: new ObjectID(data.id),
                    },
                    data.value, (err, res) => {
                        callback(err, res.result);
                    });
        },
        getChatList(userId, callback) {
            return usersDb.find({ 'online': 'Y', socketId: { $ne: userId } })
                .toArray((err, result) => {
                    callback(err, result);
                });
        },
        // insert new message into db
        insertMessages(data, callback) {
            return messagesDb.insertOne(data,
                (err, result) => {
                    callback(err, result);
                });
        },
        getMessages(userId, toUserId) {
            const data = {
                '$or': [{
                    '$and': [{
                        'toUserId': userId,
                    }, {
                        'fromUserId': toUserId,
                    }],
                }, {
                    '$and': [{
                        'toUserId': toUserId,
                    }, {
                        'fromUserId': userId,
                    }],
                }],
            };

            return messagesDb
                .find(data)
                .sort({ 'timestamp': 1 }).toArray()
                .then((result) => {
                    return result;
                });
        },
        logout(userId, isSocketId, callback) {
            const data = {
                $set: {
                    online: 'N',
                },
            };

            const condition = {};
            if (isSocketId) {
                condition.socketId = userId;
            } else {
                condition._id = new ObjectID(userId);
            }

            usersDb.update(condition, data, (err, result) => {
                callback(err, result);
            });
        },

    };
};

module.exports = { getData };
