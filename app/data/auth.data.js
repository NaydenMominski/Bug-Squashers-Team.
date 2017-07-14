const { ObjectID } = require('mongodb');
const encryption = require('../../utils/encryption');

const getData = (db) => {
    const collection = db.collection('users');
    return {
        findBy(props) {
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

        signUp(
            username,
            password,
            usertype,
            agency,
            userfirstname,
            userlastname,
            address,
            useremail,
            userphone,
            website, ) {
            return this.findBy({ username: username })
                .then((user) => {
                    if (user) {
                        throw new Error('Duplicated user');
                    }
                    const usersalt = encryption.generateSalt();
                    const hashedPass = encryption
                        .generateHashedPassword(usersalt, password);

                    user = {
                        username,
                        hashedPass,
                        usertype,
                        agency,
                        userfirstname,
                        userlastname,
                        address,
                        useremail,
                        userphone,
                        website,
                        usersalt,
                    };
                    return user;
                })
                .then((user) => {
                    return collection.insert(user)
                        .then((result) => {
                            return user;
                        });
                });
        },
    };
};

module.exports = { getData };
