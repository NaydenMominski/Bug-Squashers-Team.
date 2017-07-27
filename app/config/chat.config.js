/* eslint no-console: */

const configChat = (io, data) => {
    const chat = data.chat;
    return {
        socketEvents() {
            io.on('connection', (socket) => {
                console.log('Client connected...');
                /**
                 * get the user's Chat list
                 */
                socket.on('chat-list', (chatData) => {
                    console.log(chatData);
                    const chatListResponse = {};

                    if (chatData.id === '') {
                        chatListResponse.error = true;
                        chatListResponse.message = `User does not exits.`;
                        io.emit('chat-list-response', chatListResponse);
                    } else {
                        chat.getUserInfo(chatData.userId,
                            (err, UserInfoResponse) => {
                                delete UserInfoResponse.password;
                                chat.getChatList(socket.id,
                                    (error, res) => {
                                        io.to(socket.id)
                                            .emit('chat-list-response', {
                                                error: false,
                                                singleUser: false,
                                                chatList: res,
                                            });

                                        socket.broadcast
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
                socket.on('add-message', (chatData) => {
                    if (chatData.message === '') {
                        io.to(socket.id)
                            .emit('add-message-response',
                                'Message cant be empty');
                    } else if (chatData.fromUserId === '') {
                        io.to(socket.id)
                            .emit('add-message-response',
                                'Unexpected error, Login Again.');
                    } else if (chatData.toUserId === '') {
                        io.to(socket.id)
                            .emit('add-message-response',
                                'Select a user to chat');
                    } else {
                        const toSocketId = chatData.toSocketId;
                        // const fromSocketId = chatData.fromSocketId;
                        delete data.toSocketId;
                        chatData.timestamp = Math.floor(new Date() / 1000);

                        chat.insertMessages(chatData, (err, res) => {
                            io.to(toSocketId)
                                .emit('add-message-response', chatData);
                        });
                    }
                });

                // logout the user 
                socket.on('logout', (chatData) => {
                    const userId = chatData.id;

                    chat.logout(userId, false, (err, result) => {
                        io.to(socket.id)
                            .emit('logout-response', {
                                error: false,
                            });

                        socket.broadcast.emit('chat-list-response', {
                            error: false,
                            userDisconnected: true,
                            socketId: socket.id,
                        });
                    });
                });

                // sending the disconnected user to all socket users
                socket.on('disconnected', () => {
                    socket.broadcast.emit('chat-list-response', {
                        error: false,
                        userDisconnected: true,
                        socketId: socket.id,
                    });
                });
            });
        },

        socketConfig() {
            io.use((websock, next) => {
                const userID = websock.require._query.id;
                const userSocketId = websock.id;
                const configData = {
                    id: userID,
                    value: {
                        $set: {
                            socketId: userSocketId,
                            online: 'Y',
                        },
                    },
                };

                chat.addSocketId(configData, (err, res) => {
                    // socket id updated 
                });
                next();
            });

            this.socketEvents();
        },
    };
};

module.exports = configChat;
