/* eslint no-console: */

const constants = require('../../../utils/constants');
const { isValid } = require('../../validatorts/rents.validator');
const { isValidMail } = require('../../validatorts/sendmail.validator');
const nodemailer = require('nodemailer');
const path = '/static/pictures/rent/';


class RentsController {
    constructor(data) {
        this.data = data;
    }

    // !TODO: need to separate paging!!
    getAll(req, res) {
        const property = req.query.property || 'All';
        const location = req.query.province || 'All';
        const min = parseInt(req.query.price_from, 10) || 0;
        const max = parseInt(req.query.price_to, 10) ||
            Number.MAX_SAFE_INTEGER;

        const price = {
            '$gte': min,
            '$lt': max,
        };

        const orderBy = req.query.order_by ===
            'price' ? { price: 1 } : { date: -1 };

        const page = parseInt(req.query.page, 10) || 1;
        const pagesize = parseInt(req.query.size, 10) ||
            constants.PAGE_SIZE;

        const query = location === 'All' ? { price } : { location, price };
        if (property !== 'All') {
            query.property = property;
        }
        const queries = {
            orderBy,
            query,
            pagesize,
            page,
        };

        return Promise.all([this.data.rents.getAll(queries),
                this.data.rents.getAllCount(queries),
            ])
            .then(([rents, allRentsCount]) => {
                const pages = Math.ceil(allRentsCount / pagesize);
                const searchQuery = {
                    location: location,
                    property: property,
                    min: min,
                    max: max,
                    orderBy: req.query.order_by || 'date',
                };

                rents.forEach((rent) => {
                    const curency = parseInt(rent.price, 10);
                    rent.price = constants.convertNumberToCurrency(curency);
                });

                return res.status(200).render('rents/all', {
                    rents: rents,
                    searchQuery: searchQuery,
                    page: page,
                    pages: pages,
                    rentsCount: allRentsCount,
                });
            });
    }

    lastRents(req, res) {
        return this.data.rents.lastRents(3)
            .then((rents) => {
                rents.forEach((rent) => {
                    const curency = parseInt(rent.price, 10);
                    rent.price = constants.convertNumberToCurrency(curency);
                });
                return res.render('rents/home', {
                    context: rents,
                    province: constants.province,
                });
            });
    }

    getDetails(req, res) {
        return this.data.rents.getById(req.params.id)
            .then((rent) => {
                if (!rent) {
                    return res.redirect(404, '/rents');
                }
                rent.date = rent.date.toLocaleDateString('en-US');

                const curency = parseInt(rent.price, 10);
                rent.price = constants.convertNumberToCurrency(curency);

                return res.render('rents/details', {
                    context: rent,
                });
            })
            .catch((err) => {
                return res.redirect(404, '/rents');
            });
    }

    create(req, res) {
        if (!req.user) {
            return res.redirect('/auth/sign-in');
        }

        const rent = req.body;
        const user = req.user;
        const userdb = {
            id: user.id,
            username: user.username,
            fullname: user.firstname + ' ' + user.lastname,
            usertype: user.usertype,
            phone: user.phone,
            avatar: user.avatar || 'default-user.png',
            email: user.email,
        };

        if (!rent.avatarUrl) {
            rent.avatar = req.file ? path + req.file.filename : 'no-image.png';
        } else {
            rent.avatar = rent.avatarUrl;
        }

        rent.avatar = req.file ? req.file.filename : 'no-image.png';
        rent.price = parseInt(rent.price, 10);
        rent.user = userdb;
        rent.date = new Date();

        const errors = isValid(req);

        if (errors) {
            errors.forEach(function(error) {
                req.flash('error_msg', error.msg);
            }, this);
            return res.redirect('/rents/form');
        }

        return this.data.rents.create(rent)
            .then((result) => {
                res.redirect('/rents/' + result.id);
            });
    }

    addComment(req, res) {
        if (!req.user) {
            return res.redirect('/auth/sign-in');
        }
        const comment = req.body;
        const id = req.params.id;
        // const user = req.user;

        return this.data.addComment(comment)
            .then((result) => {
                res.redirect('/rents/' + id);
            });
    }

    editGet(req, res) {
        return this.data.rents.getById(req.params.id)
            .then((rent) => {
                if (!rent) {
                    return res.redirect(404, '/rents');
                }
                return res.render('rents/edit-form', {
                    context: rent,
                    province: constants.province,
                });
            })
            .catch((err) => {
                return res.redirect(404, '/rents');
            });
    }

    editPost(req, res) {
        if (!req.user) {
            return res.redirect('/auth/sign-in');
        }
        const id = req.params.id;
        // console.log(editedrent);
        return this.data.rents.getById(id)
            .then((rent) => {
                if (!rent) {
                    return res.redirect(404, '/rents');
                }

                const errors = isValid(req);
                if (errors) {
                    errors.forEach(function(error) {
                        req.flash('error_msg', error.msg);
                    }, this);
                    return res.redirect('/rents/edit/' + id);
                }

                const editedrent = req.body;
                const user = req.user;
                const userdb = {
                    id: user.id,
                    username: user.username,
                    fullname: user.firstname + ' ' + user.lastname,
                    usertype: user.usertype,
                    phone: user.phone,
                    avatar: user.avatar || 'default-user.png',
                    email: user.email,
                };
                if (!editedrent.avatarUrl) {
                    editedrent.avatar =
                        req.file ? path + req.file.filename : 'no-image.png';
                } else {
                    editedrent.avatar = editedrent.avatarUrl;
                }


                editedrent.price = parseInt(editedrent.price, 10);

                editedrent.user = userdb;
                editedrent.date = new Date();


                if (rent.user.id.equals(user._id)) {
                    return this.data.rents.update(rent, editedrent)
                        .then((result) => {
                            res.redirect('/rents/' + result.id);
                        });
                }
                return res.redirect('/rents/' + id);
            })
            .catch((err) => {
                return res.redirect(404, '/rents');
            });
    }

    deletePost(req, res) {
        if (!req.user) {
            return res.redirect('/auth/sign-in');
        }
        const id = req.params.id;
        return this.data.rents.getById(id)
            .then((rent) => {
                if (!rent) {
                    return res.redirect(404, '/rents');
                }
                if (rent.user.id.equals(req.user._id)) {
                    return this.data.rents.remove(rent)
                        .then((result) => {
                            res.redirect('/rents');
                        });
                }
                // console.log('Wrong user');
                return res.redirect('/user/dashboard');
            })
            .catch((err) => {
                return res.redirect(404, '/rents');
            });
    }

    addRent(req, res) {
        if (!req.user) {
            return res.redirect('/auth/sign-in');
        }
        return res.render('rents/form', {
            province: constants.province,
        });
    }

    sendMail(req, res) {
        const errors = isValidMail(req);
        if (errors) {
            errors.forEach(function(error) {
                req.flash('error_msg', error.msg);
            }, this);
            return res.redirect('/rents/' + req.body.id);
        }
        const message = req.body;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'propertyportalteam@gmail.com',
                pass: 'propertyportal123456',
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        // setup email data with unicode symbols
        const mailOptions = {
            from: message.email,
            to: 'propertyportalteam@gmail.com',
            subject: message.subject,
            template: 'recover',
            context: {
                username: 'doroteya@gmail.com',
                password: 'some_pass',
            },
            text: message.message,
            html: '<b>' + message.message + '</b>',
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions,
            (error, info) => {
                if (error) {
                    console.log(error);
                    return res.send('bad email');
                }
                console.log('Message %s sent: %s',
                    info.messageId, info.response);
                req.flash('success_msg', 'Message successfully sent!');
                return res.redirect('/rents/' + message.id);
            });
        return this;
    }
}

module.exports = RentsController;
