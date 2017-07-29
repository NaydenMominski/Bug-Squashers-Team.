const { Router } = require('express');
// const controller = require('./controller');


const initRouter = (data, controllerFactory) => {
    const router = new Router();
    // const chat = data.chat;
    const controller = controllerFactory.getChatController();
    router
        .get('/user-session', (req, res) => {
            // data.user.getUserAllUsers()
            //     .then((users) => {
            //         return res.render('chat/chat', { users: users });
            //     });

            controller.getAllUsers(req, res);
        })
        .post('/user-session', (req, res) => {
            // const userId = req.body.id;

            // const sessionCheckResponse = {};

            // !TODO: Validation
            // Test 
            // if (userId === '') {
            //     sessionCheckResponse.error = true;
            //     sessionCheckResponse.message = `User Id cant be empty.`;
            //     res.status(412).json(sessionCheckResponse);
            // }
            // chat.userSessionCheck({ id: userId })
            //     .then((user) => {
            //         if (!user) {
            //             sessionCheckResponse.error = true;
            //             sessionCheckResponse.message = `Server error.`;
            //             res.status(503).json(sessionCheckResponse);
            //         } else {
            //             sessionCheckResponse.error = false;
            //             sessionCheckResponse.message = `User logged in.`;
            //             res.status(200).json(sessionCheckResponse);
            //         }
            //     });
            controller.userSession(req, res);
        })
        .post('/get-messages', (req, res) => {
            // const userId = req.body.id;
            // const toUserId = req.body.toUserId;
            // const messagesResponse = {};
            // // !TODO: Validation
            // // Test 
            // const messages = chat.getMessages(userId, toUserId);

            // if (messages) {
            //     messagesResponse.error = true;
            //     messagesResponse.message = 'Server error.';
            //     res.status(200).json(messagesResponse);
            // } else {
            //     messagesResponse.error = false;
            //     messagesResponse.message = messages;
            //     res.status(200).json(messagesResponse);
            // }

            controller.getMessages(req, res);
        });
    return router;
};

module.exports = { initRouter };
