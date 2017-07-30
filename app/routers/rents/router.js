const { Router } = require('express');
const { upload } = require('../../../utils/uploadfiles');

const initRouter = (controllerFactory) => {
    const router = new Router();
    const controller = controllerFactory.getRentsController();

    router
        .get('/', (req, res) => {
            return controller.lastRents(req, res);
        })
        .get('/all', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/form', (req, res) => {
            return controller.addRent(req, res);
        })
        .get('/edit/:id', (req, res) => {
            return controller.editGet(req, res);
        })
        .get('/:id', (req, res) => {
            return controller.getDetails(req, res);
        })
        .post('/sendmail', (req, res, next) => {
            return controller.sendMail(req, res);
        })
        .post('/all', upload('./static/pictures/rent'), (req, res) => {
            return controller.create(req, res);
        })
        .post('/edit/:id', (req, res) => {
            return controller.deletePost(req, res);
        })
        .post('/:id', upload('./static/pictures/rent'), (req, res) => {
            return controller.editPost(req, res);
        });
    return router;
};

module.exports = { initRouter };
