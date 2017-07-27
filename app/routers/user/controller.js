/* globals console*/

const getController = (data) => {
    return {
        getUserAllProperty(req, res) {
            return res.json(req.user);
            // return Promise.all([data.getUserAllRents(req.user.username),
            //         data.getUserAllSells(req.user.username),
            //     ])
            //     .then(([rents, sells]) => {
            //         return res.json(req.user).render('user/dashboard', {
            //             sells: sells,
            //             rents: rents,
            //         });
            //     })
            //     .catch((err) => {
            //         return res.redirect(404, '/sells');
            //     });
        },
    };
};

module.exports = { getController };
