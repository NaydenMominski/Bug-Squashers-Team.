const { Router } = require('express');

const { getController } = require('./controller');


const initRouter = (data) => {
    const router = new Router();
    const controller = getController(data.user);

    router
        .get('/', (req, res) => {
            // if (!req.user) {
            //     return res.redirect('/auth/sign-in');
            // }
            return controller.getUserAllProperty(req, res);
        })
        .get('/agents', (req, res) => {
            return controller.getAllUsers(req, res);
        });
    return router;
};

module.exports = { initRouter };
