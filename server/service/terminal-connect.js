var SSHClient = require('ssh2').Client;

module.exports = TerminalConnect;

function TerminalConnect(io, _id){
    this.nameIO = io.of('/' + _id);

    this.nameIO.on('connection', function(socket) {
        var conn = new SSHClient();
        conn.on('ready', function() {
            socket.emit('data', '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');

            conn.shell(function(err, stream) {
                if (err)
                    return socket.emit('data', '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n');
                socket.on('command', function(data) {
                    stream.write(data + '\n')
                });
                stream.on('data', function(d) {
                    socket.emit('data', d.toString('binary'));
                }).on('close', function() {
                    conn.end();
                });
            });
        }).on('close', function() {
            socket.emit('data', '\r\n*** SSH CONNECTION CLOSED ***\r\n');
        }).on('error', function(err) {
            socket.emit('data', '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n')
        }).connect({
            host: 'external.sopad.ml',
            port: _id,
            username: 'root',
            password: 'docker123@'
        });
    })
}

// TODO: 프로젝트 접속인원 파악 가능하면 소켓 destroy 구현