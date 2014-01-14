var socketio = require('socket.io'),
    guestNumber = 1,
    nickNames = {},
    namesUsed = [],
    currentRoom = [],
    io;

exports.listen = function(server) {
    io = socketio.listen(server);

    io.set('log level', 1);

    io.sockets.on('connection', function(socket) {
        console.log('new connection');
        guestNumber = assignGuestNumber(socket, guestNumber, nickNames, namesUsed);

        socket.on('send:message', function(data) {
            console.log('message received ' + data.message);
            socket.broadcast.emit('send:message', {
                author: getNickname(nickNames, socket.id),
                content: data.message
            });
        });
    });
};

function assignGuestNumber(socket, guestNumber, nickNames, namesUsed) {
    var name = 'Guest' + guestNumber;

    nickNames[socket.id] = name;
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    namesUsed.push(name);

    return guestNumber + 1;
}

function getNickname(nickNames, id) {
    return nickNames[id];
}