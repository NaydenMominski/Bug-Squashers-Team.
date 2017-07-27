const { Router } = require('express');

const { getController } = require('./controller');

module.exports = {
    initRouter(data) {
        const router = new Router();
        const chat = getController(data.chat);

        router
            .post('/userSessionCheck', (req, res) => {
                const userId = req.body.id;
                const sessionCheckResponse = {};

                // !TODO: Validation
                // Test 
                if (userId === '') {
                    sessionCheckResponse.error = true;
                    sessionCheckResponse.message = `User Id cant be empty.`;
                    res.status(412).json(sessionCheckResponse);
                }
                chat.userSessionCheck({ id: userId })
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
            })
            .post('/getMessages', (req, res) => {
                const userId = req.body.id;
                const toUserId = req.body.toUserId;
                const messagesResponse = {};

                // !TODO: Validation
                // Test 
                const messages = data.chat.getMessages(userId, toUserId);

                if (messages) {
                    messagesResponse.error = true;
                    messagesResponse.message = 'Server error.';
                    res.status(200).json(messagesResponse);
                } else {
                    messagesResponse.error = false;
                    messagesResponse.message = messages;
                    res.status(200).json(messagesResponse);
                }
            });

        return router;
    },
};
