const constants = require('../../../utils/constants');

class HomeController {
    constructor(data) {
        this.data = data;
    }

    lastSells(req, res) {
        return this.data.home.lastSells(3)
            .then((sells) => {
                sells.forEach((sell) => {
                    const curency = parseInt(sell.price, 10);
                    sell.price = constants.convertNumberToCurrency(curency);
                });
                return res.render('home', {
                    context: sells,
                    province: constants.province,
                });
            });
    }
}

module.exports = HomeController;
