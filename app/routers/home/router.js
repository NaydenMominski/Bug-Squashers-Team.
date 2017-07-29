const { Router } = require('express');

const initRouter = (controllerFactory) => {
    const router = new Router();
    const controller = controllerFactory.getHomeController();

    router
        .get('/', (req, res) => {
            return controller.lastSells(req, res);
        });
    return router;
};

module.exports = { initRouter };
