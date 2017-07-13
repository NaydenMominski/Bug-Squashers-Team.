const { Router } = require('express');

module.exports = {
    initRouter() {
        const router = new Router();

        router.get('/sell', (req, res) => {
            return res.render('sell/sell');
        });

        return router;
    },
};
