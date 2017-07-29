const constants = require('../../../utils/constants');
const isValid = require('../../validatorts/rents.validator');

class SellsController {
    constructor(data) {
        this.data = data;
    }

    // need to separate paging!
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

        return Promise.all([this.data.sells.getAll(queries),
                this.data.sells.getAllCount(queries),
            ])
            .then(([sells, allSellsCount]) => {
                const pages = Math.ceil(allSellsCount / pagesize);
                const searchQuery = {
                    location: location,
                    property: property,
                    min: min,
                    max: max,
                    orderBy: req.query.order_by || 'date',
                };

                sells.forEach((sell) => {
                    const curency = parseInt(sell.price, 10);
                    sell.price = constants.convertNumberToCurrency(curency);
                });

                return res.status(200).render('sells/all', {
                    sells: sells,
                    searchQuery: searchQuery,
                    page: page,
                    pages: pages,
                    sellsCount: allSellsCount,
                });
            });
    }
    getDetails(req, res) {
        return this.data.sells.getById(req.params.id)
            .then((sell) => {
                if (!sell) {
                    return res.redirect(404, '/sells');
                }
                sell.date = sell.date.toLocaleDateString('en-US');

                const curency = parseInt(sell.price, 10);

                sell.price = constants.convertNumberToCurrency(curency);

                return res.render('sells/details', {
                    context: sell,
                });
            })
            .catch((err) => {
                return res.redirect(404, '/sells');
            });
    }
    create(req, res) {
        if (!req.user) {
            return res.redirect('/auth/sign-in');
        }
        const sell = req.body;
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

        sell.avatar = req.file ? req.file.filename : 'no-image.png';
        sell.price = parseInt(sell.price, 10);
        sell.user = userdb;
        sell.date = new Date();

        if (!isValid(sell)) {
            return Promise.resolve()
                .then(() => res.redirect(400, '/sells/form'));
        }

        return this.data.sells.create(sell)
            .then((result) => {
                res.redirect('/sells/' + result.id);
            });
    }
    editGet(req, res) {
        return this.data.sells.getById(req.params.id)
            .then((sell) => {
                if (!sell) {
                    return res.redirect(404, '/sells');
                }
                return res.render('sells/edit-form', {
                    context: sell,
                    province: constants.province,
                });
            })
            .catch((err) => {
                return res.redirect(404, '/sells');
            });
    }
    editPost(req, res) {
        if (!req.user) {
            return res.redirect('/auth/sign-in');
        }
        const id = req.params.id;
        // console.log(editedSell);
        return this.data.sells.getById(id)
            .then((sell) => {
                if (!sell) {
                    return res.redirect(404, '/sells');
                }

                const editedSell = req.body;
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

                editedSell.avatar =
                    req.file ? req.file.filename : 'no-image.png';
                editedSell.price = parseInt(editedSell.price, 10);
                editedSell.user = userdb;
                editedSell.date = new Date();


                if (sell.user.id.equals(user._id)) {
                    return this.data.sells.update(sell, editedSell)
                        .then((result) => {
                            res.redirect('/sells/' + result.id);
                        });
                }
                return res.redirect('/sells/' + id);
            })
            .catch((err) => {
                return res.redirect(404, '/sells');
            });
    }
    deletePost(req, res) {
        if (!req.user) {
            return res.redirect('/auth/sign-in');
        }
        const id = req.params.id;
        return this.data.sells.getById(id)
            .then((sell) => {
                if (!sell) {
                    return res.redirect(404, '/sells');
                }
                if (sell.user.id.equals(req.user._id)) {
                    return this.data.sells.remove(sell)
                        .then((result) => {
                            res.redirect('/sells');
                        });
                }
                // console.log('Wrong user');
                return res.redirect('/sells/' + id);
            })
            .catch((err) => {
                return res.redirect(404, '/sells');
            });
    }

    addSell(req, res) {
        if (!req.user) {
            return res.redirect('/auth/sign-in');
        }
        return res.render('sells/form', {
            province: constants.province,
        });
    }
}

module.exports = SellsController;
