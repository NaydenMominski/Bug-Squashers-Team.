const { Router } = require('express');
const passport = require('passport');
const { upload } = require('../../../utils/uploadfiles');


const initRouter = (controllerFactory) => {
    const router = new Router();
    const controller = controllerFactory.getAuthController();
    router
        .get('/sign-up', (req, res) => {
            return res.render('auth/sign-up');
        })
        .get('/sign-in', (req, res) => {
            return res.render('auth/sign-in');
        })
        .post('/sign-up', upload('./static/pictures/img'), (req, res) => {
            return controller.register(req, res);
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
    // .post('/sign-out', (req, res) => {
    // });
    return router;
};

module.exports = { initRouter };
