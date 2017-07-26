const { Router } = require('express');

const { getController } = require('./controller');

module.exports = {
    initRouter(data) {
        const router = new Router();
        const controller = getController(data.user);

        router
            .get('/', (req, res) => {
                return controller.getUserAllProperty(req, res);
            });
        return router;
    },
};
