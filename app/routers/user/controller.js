/* globals console*/

const getController = (data) => {
    return {
        getUserAllProperty(req, res) {
            return Promise.all([data.getUserAllRents(req.user.username),
                    data.getUserAllSells(req.user.username),
                    data.getUserAllUsers(),
                ])
                .then(([rents, sells, users]) => {
                    return res.json({
                        sells: sells,
                        rents: rents,
                        users: users,
                        user: req.user,
                    });
                    //     return res.render('user/dashboard', {
                    //         sells: sells,
                    //         rents: rents,
                    //     });
                })
                .catch((err) => {
                    return res.redirect(404, '/sells');
                });
        },
    };
};

module.exports = { getController };
