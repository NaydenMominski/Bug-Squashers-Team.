/* eslint no-console: */

const configChat = (io, data) => {
    // const chat = data.chat;
    const connections = [];
    let users = [];
    return {
        socketEvents() {
            io.on('connection', (socket) => {
                connections.push(socket);
                console.log('Connected: %s sockets connected',
                    connections.length);

                socket.on('join', (userdata) => {
                    socket.username = userdata.user.username;
                    const obj = {
                        username: userdata.user.username,
                        socketId: socket.id,
                        avatar: userdata.user.avatar,
                        id: userdata.user._id,
                        usertype: userdata.user.usertype,
                    };

                    users.push(obj);

                    io.emit('all-users', users);
                });

                socket.on('get-users', () => {
                    io.emit('all-users', users);
                });

                socket.on('send-message', (dataMsg) => {
                    console.log(dataMsg);
                    const message = {
                        message: dataMsg.message,
                        time: dataMsg.time,
                        timestamp: Math.floor(new Date() / 1000),
                        username: dataMsg.username,
                        avatar: dataMsg.avatar,
                    };
                    io.emit('message-recieved', {
                        message,
                    });
                });

                // sending the disconnected user to all socket users
                socket.on('disconnect', (index) => {
                    connections.splice(connections.indexOf(index));
                    console.log('Disconnected: %s sockets connected',
                        connections.length);

                    users = users.filter((user) => {
                        return user.username !== socket.username;
                    });

                    io.emit('all-users');
                });
            });
        },
    };
};

module.exports = configChat;
