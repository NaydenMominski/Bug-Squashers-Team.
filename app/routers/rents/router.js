const { Router } = require('express');
const { upload } = require('../../../utils/uploadfiles');
const constants = require('../../../utils/constants');

const { getController } = require('./controller');

module.exports = {
    initRouter(data) {
        const router = new Router();
        const controller = getController(data.rents);

        router
            .get('/', (req, res) => {
                return controller.lastRents(req, res);
            })
            .get('/all', (req, res) => {
                return controller.getAll(req, res);
            })
            .get('/form', (req, res) => {
                if (!req.user) {
                    return res.redirect('/auth/sign-in');
                }
                return res.render('rents/form', {
                    province: constants.province,
                });
            })
            .get('/edit/:id', (req, res) => {
                return controller.editGet(req, res);
            })
            .get('/:id', (req, res) => {
                return controller.getDetails(req, res);
            })
            .post('/all', upload('./static/pictures/rent'), (req, res) => {
                if (!req.user) {
                    return res.redirect('/auth/sign-in');
                }
                // console.log(typeof req.body.price);
                return controller.create(req, res);
            })
            .post('/edit/:id', (req, res) => {
                if (!req.user) {
                    return res.redirect('/auth/sign-in');
                }
                return controller.deletePost(req, res);
            })
            .post('/:id', upload('./static/pictures/rent'), (req, res) => {
                if (!req.user) {
                    return res.redirect('/auth/sign-in');
                }
                return controller.editPost(req, res);
            });
        return router;
    },
};
