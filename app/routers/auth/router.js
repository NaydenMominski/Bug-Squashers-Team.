const { Router } = require('express');
const passport = require('passport');
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
            .post('/sign-up', (req, res) => {
                const {
                    username,
                    password,
                    usertype,
                    agency,
                    userfirstname,
                    userlastname,
                    address,
                    useremail,
                    userphone,
                    website,
                } = req.body;

                const usersalt = encryption.generateSalt();
                const hashedPass = encryption
                    .generateHashedPassword(usersalt, password);

                return data.auth.create(
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
                        usersalt)
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
