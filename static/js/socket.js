const socket = io.connect('http://localhost:3005');

socket.on('connect', (data) => {
    socket.emit('chat-list', 'Hello World from client');
});
