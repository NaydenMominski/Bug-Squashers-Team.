const { Router } = require('express');

// const { getController } = require('./controller');

const initRouter = (data, controllerFactory) => {
    const router = new Router();
    const controller = controllerFactory.getHomeController();
    // const controller = getController(data.home);

    router
        .get('/', (req, res) => {
            return controller.lastSells(req, res);
        });
    return router;
};

module.exports = { initRouter };
