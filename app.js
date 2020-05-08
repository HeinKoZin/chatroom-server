var express = require('express');
var socket = require('socket.io');
var PORT = process.env.PORT || 4000;
var app = express();
var server = app.listen(PORT, () => {
    console.log('listening')
});


app.use(express.static('public'));
var io = socket(server);


let messages = []
let initialLength = messages.length;

io.on('connection', (socket) => {

    socket.broadcast.emit('messages', { message: `${socket.id} is conneted.`, by: 'other' });
    socket.emit('messages', { message: 'you are connected', by: 'me' });
    socket.on('send', (e) => {
        // messages.push(e);
        socket.emit('messages', { message: e, by: 'me' });
        socket.broadcast.emit('messages', { message: e, by: 'other' });
    });

});
