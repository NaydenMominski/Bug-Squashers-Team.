const { Router } = require('express');
const passport = require('passport');
const { upload } = require('../../../utils/uploadfiles');

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
            .post('/sign-up', upload('./static/pictures/img'), (req, res) => {
                // console.log(req.file);
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
