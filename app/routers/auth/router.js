const { Router } = require('express');
const passport = require('passport');
const { upload } = require('../../../utils/uploadfiles');
const { getController } = require( './controller');

module.exports = {
    initRouter(data) {
        const router = new Router();
        const controller = getController(data);

        router
            .get('/sign-up', (req, res) => {
                return res.render('auth/sign-up');
            })
            .get('/sign-in', (req, res) => {
                return res.render('auth/sign-in');
            })
            .post('/sign-up', upload('./static/pictures/img'), (req, res) => {
                // console.log(req.file);
                controller.create(req, res);
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
