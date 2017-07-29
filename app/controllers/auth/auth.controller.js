const encryption = require('../../../utils/encryption');
const { upload } = require('../../../utils/uploadfiles');
const { isValid } = require('../../validatorts/registration.validator');

class AuthController {
    constructor(data) {
        this.data = data;
    }

    register(req, res) {
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

        const errors = isValid(req);

        if (errors) {
            return res.render('auth/sign-up', {
                errors: errors,
            });
        }

        user.timestamp = Math.floor(new Date() / 1000);
        user.online = 'N';
        user.socketId = '';

        return this.data.auth.signUp(user)
            .then(() => {
                req.flash('success_msg',
                        'You are registered and can now login');
                res.redirect('/auth/sign-in');
            });
    }

    logout(req, res) {
        const userId = req.user._id;
        this.data.chat.logout(userId, false, (req, res));
    }
}

module.exports = AuthController;
