var updateIO = null;

exports.init = function (io) {
    updateIO = io.of('/update');
    updateIO.on('connection', function(socket) {
        console.log('update connection 생성')

        socket.on('join room', function (roomName) {
            socket.join(roomName);
            console.log(roomName, '에 join')
        })
    });
};

exports.update = function (roomName, object) {
    updateIO.to(roomName).emit(object.type, object.data);
};