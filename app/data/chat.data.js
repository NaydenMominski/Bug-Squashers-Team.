const { ObjectID } = require('mongodb');


const chatData = (db) => {
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
                .findAndModify(data, [], { $set: { online: 'Y', available: 'Y' } });
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
        // update the socket id of single user
        addSocketId(data) {
            usersDb.update({ _id: new ObjectID(data.id) }, data.value);
        },
        getChatList() {},
        // insert new message into db
        insertMessages(data) {
            return messagesDb.insertOne(data)
                .then((result) => {
                    return result;
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

            messagesDb
                .find(data)
                .sort({ 'timestamp': 1 }).toArray()
                .then((result) => {
                    return result;
                });
        },
        logout(userId, isSocketId) {
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

            usersDb.update(condition, data)
                .then((result) => {
                    console.log(result);
                });
        },

    };
};

module.exports = chatData;
