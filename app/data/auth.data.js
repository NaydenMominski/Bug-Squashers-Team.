const { ObjectID } = require('mongodb');

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
        findByUsername(username) {
            const user = db.get('users')
                .find({ username })
                .value();
            return Promise.resolve(user);
        },
        create(username,
            hashedPass,
            usertype,
            agency,
            userfirstname,
            userlastname,
            address,
            useremail,
            userphone,
            website,
            usersalt) {
            const user = {
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

            return collection.insert(user)
                .then((result) => {
                    return user;
                });
        },
    };
};

module.exports = { getData };
