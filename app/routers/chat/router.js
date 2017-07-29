const { Router } = require('express');


const initRouter = (controllerFactory) => {
    const router = new Router();
    const controller = controllerFactory.getChatController();
    router
        .get('/user-session', (req, res) => {
            return controller.getAllUsers(req, res);
        })
        .post('/user-session', (req, res) => {
            return controller.userSession(req, res);
        })
        .get('/get-messages', (req, res) => {
            return controller.getMessages(req, res);
        })
        .post('/get-messages', (req, res) => {
            return controller.getMessages(req, res);
        });
    return router;
};

module.exports = { initRouter };
