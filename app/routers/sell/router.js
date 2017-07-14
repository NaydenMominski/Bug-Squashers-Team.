const { Router } = require('express');

module.exports = {
    initRouter() {
        const router = new Router();

        router
            .get('/sell', (req, res) => {
                return res.render('sell/allsells');
            })
            .get('/addform', (req, res) => {
                return res.render('sell/addsellproperty');
            });
        return router;
    },
};
