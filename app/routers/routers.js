/* globals __dirname */

const fs = require('fs');
const path = require('path');
const { ControllersFactory } = require('../../utils/controllerfactory');
const controllers = require('../controllers');

const attachTo = (app, data) => {
    app.get('/404', (req, res) => {
        res.render('notfound');
    });

    fs.readdirSync(__dirname)
        .map((dir) => ({
            name: dir,
            path: path.join(__dirname, dir, 'router.js'),
        }))
        .filter((dir) => fs.existsSync(dir.path))
        .forEach((dir) => {
            const { initRouter } = require(dir.path);
            const prefix =
                dir.name === 'home' ?
                '/' :
                ('/' + dir.name);
            const controller = new ControllersFactory(controllers, data);
            app.use(prefix, initRouter(controller));
        });

    app.get('*', (req, res) => {
        res.redirect('/404');
    });
};

module.exports = { attachTo };
