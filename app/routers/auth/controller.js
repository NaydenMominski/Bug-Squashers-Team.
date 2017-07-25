const encryption = require('../../../utils/encryption');

const isValid = (user) => {
    const usernameReg = new RegExp(
        '^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$'
    );

    const passwordReg = new RegExp(
        '^[0-9a-zA-Z]{5,}$'
    );

    return usernameReg.test(user.username)
    && passwordReg.test(user.password);
};

const getController = (data) => {
    return {
        create(req, res) {
            const salt = encryption.generateSalt();
            const user = {
                username: req.body.username,
                hashedPass: encryption
                    .generateHashedPassword(salt, req.body.password),
                salt: salt,
                usertype: req.body.usertype,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                agency: req.body.agency,
                phone: req.body.phone,
                email: req.body.email,
                website: req.body.website,
                avatar: req.file ? req.file.filename : 'default.png',
                sellproperty: {},
            };

            if (!isValid(req.body)) {
                return Promise.resolve()
                .then(() => res.redirect(400, '/auth/sign-up'));
            }

            return data.auth.signUp(user)
                .then(() => {
                    res.redirect('/auth/sign-in');
                });
        },
    };
};

module.exports = { getController };
