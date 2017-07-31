const { ObjectID } = require('mongodb');


const getData = (db) => {
    const collection = db.collection('users');
    return {
        findBy(props) {
            collection
                .findAndModify(props, [], { $set: { online: 'Y' } });
            return collection.findOne(props);
        },
        getById(id) {
            return collection.findOne({ _id: new ObjectID(id) })
                .then((user) => {
                    if (!user) {
                        return null;
                    }

                    user.id = user._id;
                    return user;
                });
        },

        signUp(newUser) {
            return this.findBy({ username: newUser.username })
                .then((user) => {
                    if (user) {
                        return 'Error'; 
                    }
                    return newUser;
                })
                .then((user) => {
                    if (user === 'Error'){
                        return user;
                    }
                    return collection.insert(user)
                        .then((result) => {
                            return user;
                        });
                });
        },
    };
};

module.exports = { getData };
