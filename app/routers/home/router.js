const { Router } = require('express');

module.exports = {
    initRouter() {
        const router = new Router();

        router.get('/', (req, res) => {
            return res.render('home');
        });

        return router;
    },
};
