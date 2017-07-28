/* globals __dirname */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const expressValidator = require('express-validator');

const configApp = (app) => {
    app.set('view engine', 'pug');

    app.use(bodyParser.urlencoded({
        extended: false,
    }));

    app.use(expressValidator({
        errorFormatter: function(param, msg, value) {
            const namespace = param.split('.');
            const root = namespace.shift();
            let formParam = root;

            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value,
            };
        },
    }));

    app.use(flash());

    app.use(function (req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
    })

    app.use('/static', express
        .static(path.join(__dirname, '../../static')));
    app.use('/libs', express
        .static(path.join(__dirname, '../../node_modules')));
    app.use('/js', express
        .static(path.join(__dirname, '../../node_modules/bootstrap/dist/js')));
    app.use('/js', express
        .static(path.join(__dirname, '../../node_modules/jquery/dist')));
    app.use('/css', express
        .static(path.join(__dirname, '../../node_modules/bootstrap/dist/css')));
};

module.exports = configApp;
