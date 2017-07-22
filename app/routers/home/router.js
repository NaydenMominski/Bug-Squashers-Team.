const { Router } = require('express');

const { getController } = require('./controller');

module.exports = {
    initRouter(data) {
        const router = new Router();
        const controller = getController(data.home);

        router
            .get('/', (req, res) => {
                return controller.lastSells(req, res);
            });
        return router;
    },
};
