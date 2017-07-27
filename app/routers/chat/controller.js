 const io = require('../../../utils/socket');

 const getController = (data) => {
     // const io = socket;

     return {
         socketEvents() {
             io.on('connection', (websoc) => {
                 console.log('Client connected...');
                 /**
                  * get the user's Chat list
                  */
                 websoc.on('chat-list', (data) => {
                     console.log(data);
                     const chatListResponse = {};

                     if (data.id === '') {
                         chatListResponse.error = true;
                         chatListResponse.message = `User does not exits.`;
                         io.emit('chat-list-response', chatListResponse);
                     } else {
                         data.getUserInfo(data.userId,
                             (err, UserInfoResponse) => {
                                 delete UserInfoResponse.password;
                                 data.getChatList(websoc.id,
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
                 websoc.on('add-message', (msgData) => {
                     if (msgData.message === '') {
                         io.to(websoc.id)
                             .emit('add-message-response',
                                 'Message cant be empty');
                     } else if (msgData.fromUserId === '') {
                         io.to(socket.id)
                             .emit('add-message-response',
                                 'Unexpected error, Login Again.');
                     } else if (msgData.toUserId === '') {
                         io.to(websoc.id)
                             .emit('add-message-response',
                                 'Select a user to chat');
                     } else {
                         const toSocketId = msgData.toSocketId;
                         const fromSocketId = msgData.fromSocketId;
                         delete msgData.toSocketId;
                         data.timestamp = Math.floor(new Date() / 1000);

                         msgData.insertMessages(msgData, (err, res) => {
                             io.to(toSocketId)
                                 .emit('add-message-response', msgData);
                         });
                     }
                 });

                 // logout the user 
                 websoc.on('logout', (msgData) => {
                     const userId = data.id;

                     msgData.logout(userId, false, (err, result) => {
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

                 data.addSocketId(data, (err, res) => {
                     // socket id updated 
                 });
                 next();
             });

             this.socketEvents();
         },
     };
 };

 module.exports = { getController };
