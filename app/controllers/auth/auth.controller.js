const encryption = require('../../../utils/encryption');
const { upload } = require('../../../utils/uploadfiles');
class AuthController {
    constructor(data) {
        this.data = data;
    }
    check(user) {
        user.checkBody({
            'username': {
                notEmpty: true,
                matches: {
                    options: [
                        /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$/
                    ],
                },
                // Error message for the parameter
                errorMessage: 'Invalid Username',
            },
            'password': {
                notEmpty: true,
                matches: {
                    options: [/^[0-9a-zA-Z]{5,30}$/],
                },
                // Error message for the parameter
                errorMessage: 'Invalid Password',
            },
        });

        user.checkBody('password2', 'Passwords are not the same')
            .equals(user.body.password);

        const errors = user.validationErrors();

        return errors;
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

        const errors = this.check(req);

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
                req
                    .flash('success_msg',
                        'You are registered and can now login');
                res.redirect('/auth/sign-in');
            });
    }
}

module.exports = AuthController;
