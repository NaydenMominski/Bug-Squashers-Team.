const constants = require('../../../utils/constants');

const isValid = (item) => {
    return typeof item !== 'undefined' &&
        typeof item.headline === 'string' &&
        item.headline.length > 3;
};

const getController = (data) => {
    return {
        getAll(req, res) {
            const location = req.query.province || 'All';
            const min = parseInt(req.query.price_from, 10) || 0;
            const max = parseInt(req.query.price_to, 10) || Number.MAX_SAFE_INTEGER;
            const price = { '$gte': min, '$lt': max };
            const orderBy = req.query.order_by === 'price' ? { price: 1 } : { date: -1 };
            const page = parseInt(req.query.page, 10) || 0;
            const pagesize = parseInt(req.query.size, 10) || 5;

            const query = location === 'All' ? { price } : { location, price };
            const queries = {
                orderBy,
                query,
            };
            const searchQuery = {
                location: location,
                min: min,
                max: max,
                orderBy: req.query.order_by || 'date',
                page: page,
            };

            return data.getAll(queries)
                .then((sells) => {
                    const pagesLen = Math.ceil(sells.length / pagesize);
                    const pages = [];
                    const sellsResults = sells.length;

                    for (let i = 0; i < pagesLen; i += 1) {
                        pages.push({
                            curentPage: page,
                            searchQuery: searchQuery,
                        });
                    }
                    sells = sells.slice(page * pagesize, (page + 1) * pagesize);

                    sells.forEach((sell) => {
                        const curency = parseInt(sell.price, 10);
                        sell.price = curency.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                        });
                    });
                    return res.render('sells/all', {
                        context: sells,
                        pages: pages,
                        results: sellsResults,
                        searchQuery: req.query,

                    });
                });
        },
        getDetails(req, res) {
            return data.getById(req.params.id)
                .then((sell) => {
                    if (!sell) {
                        return res.redirect(404, '/sells');
                    }
                    sell.date = sell.date.toLocaleDateString('en-US');

                    const curency = parseInt(sell.price, 10);
                    sell.price = curency.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                    });
                    return res.render('sells/details', {
                        context: sell,
                    });
                })
                .catch((err) => {
                    return res.redirect(404, '/sells');
                });
        },
        create(req, res) {
            const sell = req.body;
            const user = req.user;
            const userdb = {
                id: user.id,
                username: user.username,
                usertype: user.usertype,
                phone: user.phone,

            };

            sell.avatar = req.file ? req.file.filename : 'no-image.png';
            sell.price = parseInt(sell.price, 10);
            sell.user = userdb;
            sell.date = new Date();

            if (!isValid(sell)) {
                return Promise.resolve()
                    .then(() => res.redirect(400, '/sells/form'));
            }

            return data.create(sell)
                .then((result) => {
                    res.redirect('/sells/' + result.id);
                });
        },
        editGet(req, res) {
            return data.getById(req.params.id)
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
        },
        editPost(req, res) {
            const id = req.params.id;
            // console.log(editedSell);
            data.getById(id)
                .then((sell) => {
                    if (!sell) {
                        return res.redirect(404, '/sells');
                    }

                    const editedSell = req.body;
                    const user = req.user;
                    const userdb = {
                        id: user.id,
                        username: user.username,
                        usertype: user.usertype,
                        phone: user.phone,
                    };

                    editedSell.avatar = req.file ? req.file.filename : 'no-image.png';
                    editedSell.price = parseInt(editedSell.price, 10);
                    editedSell.user = userdb;
                    editedSell.date = new Date();


                    if (sell.user.id.equals(user._id)) {
                        return data.update(sell, editedSell)
                            .then((result) => {
                                res.redirect('/sells/' + result.id);
                            });
                    }
                    return res.redirect('/sells/' + id);
                })
                .catch((err) => {
                    return res.redirect(404, '/sells');
                });
        },
        deletePost(req, res) {
            const id = req.params.id;
            data.getById(id)
                .then((sell) => {
                    if (!sell) {
                        return res.redirect(404, '/sells');
                    }
                    if (sell.user.id.equals(req.user._id)) {
                        return data.remove(sell)
                            .then((result) => {
                                res.redirect('/sells');
                            });
                    }
                    console.log('Wrong user');
                    return res.redirect('/sells/' + id);
                })
                .catch((err) => {
                    return res.redirect(404, '/sells');
                });
        },
    };
};

module.exports = { getController };
