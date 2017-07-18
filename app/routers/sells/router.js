const { Router } = require('express');
const { upload } = require('../../../utils/uploadfiles');

const { getController } = require('./controller');

module.exports = {
    initRouter(data) {
        const router = new Router();
        const controller = getController(data.sells);

        router
            .get('/', (req, res) => {
                return controller.getAll(req, res);
            })
            .get('/form', (req, res) => {
                if (!req.user) {
                    return res.redirect('/auth/sign-in');
                }

                return res.render('sells/form');
            })
            .get('/:id', (req, res) => {
                return controller.getDetails(req, res);
            })
            .post('/', upload('./static/pictures/sell'), (req, res) => {
                if (!req.user) {
                    return res.redirect('/auth/sign-in');
                }
                return controller.create(req, res);
            });
        return router;
    },
};
