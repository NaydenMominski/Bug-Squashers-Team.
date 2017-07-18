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
            const sellimages = req.file;

            if (!isValid(sell)) {
                return Promise.resolve()
                    .then(() => res.redirect(400, '/sells/form'));
            }

            return data.create(sell, sellimages)
                .then((result) => {
                    console.log(result);
                    res.redirect('/sells/' + result.id);
                });
        },
    };
};


module.exports = { getController };
