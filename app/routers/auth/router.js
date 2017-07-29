const { Router } = require('express');
const passport = require('passport');
const { upload } = require('../../../utils/uploadfiles');
// const controller = require('./controller');


const initRouter = (data, controllerFactory) => {
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
            // console.log(req.file);
            controller.register(req, res);
            // const salt = encryption.generateSalt();
            // const user = {
            //     username: req.body.username,
            //     hashedPass: encryption
            //         .generateHashedPassword(salt, req.body.password),
            //     salt: salt,
            //     usertype: req.body.usertype,
            //     firstname: req.body.firstname,
            //     lastname: req.body.lastname,
            //     agency: req.body.agency,
            //     phone: req.body.phone,
            //     email: req.body.email,
            //     website: req.body.website,
            //     avatar: req.file ? req.file.filename : 'default.png',
            //     sellproperty: {},
            // };

            // const errors = controller.check(req);
            // if (errors) {
            //     return res.render('auth/sign-up', {
            //         errors: errors,
            //     });
            // }
            // user.timestamp = Math.floor(new Date() / 1000);
            // user.online = 'N';
            // user.socketId = '';

            // return data.auth.signUp(user)
            //     .then(() => {
            //         req.flash('success_msg', 'You are registered and can now login');
            //         res.redirect('/auth/sign-in');
            //     });
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
    //     const userId = req.body.id;
    //     controller.getController(data.chat);

    //     data.chat.logout(req.user._id);
    // });
    return router;
};

module.exports = { initRouter };
