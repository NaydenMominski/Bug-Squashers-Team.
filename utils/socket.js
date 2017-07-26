const path = require('path');
const chat = require('../app/data/chat.data');

const socket = (websocket) => {
    const io = websocket;

    return {
        socketEvents() {
            io.on('connection', (websoc) => {
                /**
                 * get the user's Chat list
                 */
                websoc.on('chat-list', (data) => {
                    const chatListResponse = {};

                    if (data.id === '') {
                        chatListResponse.error = true;
                        chatListResponse.message = `User does not exits.`;
                        io.emit('chat-list-response', chatListResponse);
                    } else {
                        chat.getUserInfo(data.userId,
                            (err, UserInfoResponse) => {
                                delete UserInfoResponse.password;
                                chat.getChatList(websoc.id,
                                    (error, res) => {
                                        io.to(websoc.id)
                                            .emit('chat-list-response', {
                                                error: false,
                                                singleUser: false,
                                                chatList: res,
                                            });

                                        websoc.broadcast
                                            .emit('chat-list-response', {
                                                error: false,
                                                singleUser: true,
                                                chatList: UserInfoResponse,
                                            });
                                    });
                            });
                    }
                });

                // send the messages to the user 
                websoc.on('add-message', (data) => {
                    if (data.message === '') {
                        io.to(websoc.id)
                            .emit('add-message-response',
                                'Message cant be empty');
                    } else if (data.fromUserId === '') {
                        io.to(socket.id)
                            .emit('add-message-response',
                                'Unexpected error, Login Again.');
                    } else if (data.toUserId === '') {
                        io.to(websoc.id)
                            .emit('add-message-response', 'Select a user to chat');
                    } else {
                        const toSocketId = data.toSocketId;
                        const fromSocketId = data.fromSocketId;
                        delete data.toSocketId;
                        data.timestamp = Math.floor(new Date() / 1000);

                        chat.insertMessages(data, (err, res) => {
                            io.to(toSocketId)
                                .emit('add-message-response', data);
                        });
                    }
                });

                // logout the user 
                websoc.on('logout', (data) => {
                    const userId = data.id;

                    chat.logout(userId, false, (err, result) => {
                        io.to(websoc.id)
                            .emit('logout-response', {
                                error: false,
                            });

                        websoc.broadcast.emit('chat-list-response', {
                            error: false,
                            userDisconnected: true,
                            socketId: websoc.id,
                        });
                    });
                });

                // sending the disconnected user to all socket users
                websoc.on('disconnected', () => {
                    websoc.broadcast.emit('chat-list-response', {
                        error: false,
                        userDisconnected: true,
                        socketId: websoc.id,
                    });
                });
            });
        },

        socketConfig() {
            io.use((websock, next) => {
                const userID = websock.require._query.id;
                const userSocketId = websock.id;
                const data = {
                    id: userID,
                    value: {
                        $set: {
                            socketId: userSocketId,
                            online: 'Y',
                        },
                    },
                };

                chat.addSocketId(data, (err, res) => {
                    // socket id updated 
                });
                next();
            });

            this.socketEvents();
        },
    };
};

module.exports = socket;
