const constants = require('../../../utils/constants');

const getController = (data) => {
    return {
        lastSells(req, res) {
            return data.lastSells(3)
                .then((sells) => {
                    sells.forEach((sell) => {
                        const curency = parseInt(sell.price, 10);
                        sell.price = curency.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                        });
                    });
                    return res.render('home', {
                        context: sells,
                        province: constants.province,
                    });
                });
        },
    };
};

module.exports = { getController };
