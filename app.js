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
    socket.broadcast.emit('messages', { message: `${socket.id} is conneted.`, date: new Date().toISOString(), by: 'other' });
    socket.emit('messages', { message: 'You are connected to ChatRoom.', date: new Date().toISOString(), by: 'me' });
    socket.on('send', (e, f) => {
        // messages.push(e);
        socket.emit('messages', { message: e, date: f, by: 'me' });
        socket.broadcast.emit('messages', { message: e, date: f, by: 'other' });
    });

});
