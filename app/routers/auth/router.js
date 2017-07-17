const { Router } = require('express');
const passport = require('passport');
const { upload } = require('../../../utils/uploadfiles');
const encryption = require('../../../utils/encryption');

module.exports = {
    initRouter(data) {
        const router = new Router();

        router
            .get('/sign-up', (req, res) => {
                return res.render('auth/sign-up');
            })
            .get('/sign-in', (req, res) => {
                return res.render('auth/sign-in');
            })
            .post('/sign-up', upload(), (req, res) => {
                // console.log(req.file);

                const usersalt = encryption.generateSalt();
                const user = {
                    username: req.body.username,
                    hashedPass: encryption
                        .generateHashedPassword(usersalt, req.body.password),
                    salt: usersalt,
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

                return data.auth.signUp(user)
                    .then(() => {
                        res.redirect('/auth/sign-in');
                    });
            })
            .post('/sign-in', passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/auth/sign-in',
                failureFlash: true,
            }))
            .get('/sign-out', (req, res) => {
                req.logout();
                res.redirect('/');
            });
        return router;
    },
};
