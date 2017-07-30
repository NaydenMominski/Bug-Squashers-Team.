class UserController {
    constructor(data) {
        this.data = data;
    }

    getUserAllProperty(req, res) {
        return Promise.all([this.data.user.getUserAllRents(req.user.username),
                this.data.user.getUserAllSells(req.user.username),
                this.data.user.getUserAllUsers(),
            ])
            .then(([rents, sells, users]) => {
                return res.json({
                    sells: sells,
                    rents: rents,
                    users: users,
                    user: req.user,
                });
            })
            .catch((err) => {
                return res.redirect(404, '/home');
            });
    }

    getAllUsers(req, res) {
        const userObj = {};
        return this.data.user.getUserAllUsers()
            .then((users) => {
                userObj = users;
                return this.data.chat.getAllMessages();
            })
            .then((messages) => {
                userObj.messages = messages;
                return res.render('user/agents', {
                    users: userObj,
                });
            })
            .catch((err) => {
                return res.redirect(404, '/sells');
            });
    }
}

module.exports = UserController;
