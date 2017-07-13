const { Router } = require('express');
const passport = require('passport');

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
                const { username, password } = req.body;
                return data.auth.create(username, password)
                    .then(() => {
                        res.redirect('/auth/sign-in');
                    });
            })
            .post('/sign-in', passport.authenticate('local',
                {
                    successRedirect: '/',
                    failureRedirect: '/auth/sign-in',
                    failureFlash: true,
                })
            )
            .get('/sign-out', (req, res) => {
                req.logout();
                res.redirect('/');
            });
        return router;
    },
};
