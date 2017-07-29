const { Router } = require('express');
const { upload } = require('../../../utils/uploadfiles');

module.exports = {
    initRouter(controlleFactory) {
        const router = new Router();
        const controller = controlleFactory.getSellsController();

        router
            .get('/', (req, res) => {
                return controller.getAll(req, res);
            })
            .get('/form', (req, res) => {
                return controller.addSell(req, res);
            })
            .get('/edit/:id', (req, res) => {
                return controller.editGet(req, res);
            })
            .get('/:id', (req, res) => {
                return controller.getDetails(req, res);
            })
            .post('/', upload('./static/pictures/sell'), (req, res) => {
                return controller.create(req, res);
            })
            .post('/edit/:id', (req, res) => {
                return controller.deletePost(req, res);
            })
            .post('/:id', upload('./static/pictures/sell'), (req, res) => {
                return controller.editPost(req, res);
            });
        return router;
    },
};
