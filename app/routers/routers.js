/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    fs.readdirSync(__dirname)
        .map((dir) => ({
            name: dir,
            path: path.join(__dirname, dir, 'router.js'),
        }))
        .filter((dir) => fs.existsSync(dir.path))
        .forEach((dir) => {
            const { initRouter } = require(dir.path);
            const prefix =
                dir.name === 'home'
                    ? '/'
                    : ('/' + dir.name);
            app.use(prefix, initRouter(data));
        });
};

module.exports = { attachTo };
