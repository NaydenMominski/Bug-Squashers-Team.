'use strict';

$(function() {
    const socket = io.connect('localhost:3005');
    // $.ajax({
    //     url: '/userSessionCheck',
    //     success: (res) => {
    //         success(res);
    //     },
    //     error: (err) => {
    //         error(err);
    //     },
    //     type: 'POST',
    // });


    console.log(io);
    // let socket = io.connect(window.location.href);
    // console.log(socket);
    // socket.on('chat-list-response', function(data) {
    //     console.log(data);
    //     socket.emit('chat-list', { message: 'Hello to you too!' });
    // });

});
