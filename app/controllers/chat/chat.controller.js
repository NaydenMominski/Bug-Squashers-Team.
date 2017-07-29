class ChatController {
    constructor(data) {
        this.data = data;
    }

    getAllUsers(req, res) {
        this.data.user.getUserAllUsers()
            .then((users) => {
                return res.render('chat/chat', { users: users });
            });
    }

    userSession(req, res) {
        const userId = req.body.id;
        const sessionCheckResponse = {};

        if (userId === '') {
            sessionCheckResponse.error = true;
            sessionCheckResponse.message = `User Id cant be empty.`;
            res.status(412).json(sessionCheckResponse);
        }

        this.data.chat.userSessionCheck({ id: userId })
            .then((user) => {
                if (!user) {
                    sessionCheckResponse.error = true;
                    sessionCheckResponse.message = `Server error.`;
                    res.status(503).json(sessionCheckResponse);
                } else {
                    sessionCheckResponse.error = false;
                    sessionCheckResponse.message = `User logged in.`;
                    res.status(200).json(sessionCheckResponse);
                }
            });
    }

    getMessages(req, res) {
        const userId = req.body.id;
        const toUserId = req.body.toUserId;
        const messagesResponse = {};

        const messages = this.data.chat.getMessages(userId, toUserId);
        console.log(messages);
        if (messages) {
            messagesResponse.error = true;
            messagesResponse.message = 'Server error.';
            res.status(200).json(messagesResponse);
        } else {
            messagesResponse.error = false;
            messagesResponse.message = messages;
            res.status(200).json(messagesResponse);
        }
    }
}

module.exports = ChatController;
