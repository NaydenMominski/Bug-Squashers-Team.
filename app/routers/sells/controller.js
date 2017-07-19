const isValid = (item) => {
    return typeof item !== 'undefined' &&
        typeof item.headline === 'string' &&
        item.headline.length > 3;
};

const getController = (data) => {
    return {
        getAll(req, res) {
            return data.getAll()
                .then((sells) => {
                    return res.render('sells/all', {
                        context: sells,
                    });
                });
        },
        getDetails(req, res) {
            return data.getById(req.params.id)
                .then((sell) => {
                    if (!sell) {
                        return res.redirect(404, '/sells/all');
                    }
                    sell.date = sell.date.toLocaleDateString('en-US');

                    const curency = +sell.price;
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
                    return res.redirect(404, '/sells/all');
                });
        },
        create(req, res) {
            const sell = req.body;
            const user = req.user;
            const sellimages = req.file;

            if (!isValid(sell)) {
                return Promise.resolve()
                    .then(() => res.redirect(400, '/sells/form'));
            }

            return data.create(user, sell, sellimages)
                .then((result) => {
                    res.redirect('/sells/' + result.id);
                });
        },
        editGet(req, res) {
            return data.getById(req.params.id)
                .then((sell) => {
                    if (!sell) {
                        return res.redirect(404, '/sells/all');
                    }
                    console.log(sell);
                    return res.render('sells/edit-form', {
                        context: sell,
                    });
                })
                .catch((err) => {
                    return res.redirect(404, '/sells/all');
                });
        },
    };
};

module.exports = { getController };
