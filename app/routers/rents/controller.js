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
            const page = parseInt(req.query.page, 10) || 1;
            const pagesize = parseInt(req.query.size, 10) || constants.PAGE_SIZE;

            const query = location === 'All' ? { price } : { location, price };
            const queries = {
                orderBy,
                query,
                pagesize,
            };

            return Promise.all([data.getAll(queries), data.getAllCount(queries)])
                .then(([rents, allRentsCount]) => {
                    const pages = Math.ceil(allRentsCount / pagesize);
                    const searchQuery = {
                        location: location,
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
        },
        lastRents(req, res) {
            return data.lastRents(3)
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
        },
        getDetails(req, res) {
            return data.getById(req.params.id)
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
        },
        create(req, res) {
            const rent = req.body;
            const user = req.user;
            const userdb = {
                id: user.id,
                username: user.username,
                usertype: user.usertype,
                phone: user.phone,

            };

            rent.avatar = req.file ? req.file.filename : 'no-image.png';
            rent.price = parseInt(rent.price, 10);
            rent.user = userdb;
            rent.date = new Date();

            if (!isValid(rent)) {
                return Promise.resolve()
                    .then(() => res.redirect(400, '/rents/form'));
            }

            return data.create(rent)
                .then((result) => {
                    res.redirect('/rents/' + result.id);
                });
        },
        editGet(req, res) {
            return data.getById(req.params.id)
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
        },
        editPost(req, res) {
            const id = req.params.id;
            // console.log(editedrent);
            data.getById(id)
                .then((rent) => {
                    if (!rent) {
                        return res.redirect(404, '/rents');
                    }

                    const editedrent = req.body;
                    const user = req.user;
                    const userdb = {
                        id: user.id,
                        username: user.username,
                        usertype: user.usertype,
                        phone: user.phone,
                        avatar: user.avatar,
                    };

                    editedrent.avatar = req.file ? req.file.filename : 'no-image.png';
                    editedrent.price = parseInt(editedrent.price, 10);
                    editedrent.user = userdb;
                    editedrent.date = new Date();


                    if (rent.user.id.equals(user._id)) {
                        return data.update(rent, editedrent)
                            .then((result) => {
                                res.redirect('/rents/' + result.id);
                            });
                    }
                    return res.redirect('/rents/' + id);
                })
                .catch((err) => {
                    return res.redirect(404, '/rents');
                });
        },
        deletePost(req, res) {
            const id = req.params.id;
            data.getById(id)
                .then((rent) => {
                    if (!rent) {
                        return res.redirect(404, '/rents');
                    }
                    if (rent.user.id.equals(req.user._id)) {
                        return data.remove(rent)
                            .then((result) => {
                                res.redirect('/rents');
                            });
                    }
                    console.log('Wrong user');
                    return res.redirect('/rents/' + id);
                })
                .catch((err) => {
                    return res.redirect(404, '/rents');
                });
        },
    };
};

module.exports = { getController };
