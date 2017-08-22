Client = require('ssh2').Client;

var readline = require('readline'); 
var r = readline.createInterface({
	input: process.stdin
	//output:process.stdout
});

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


io.on('connection', function(socket){

	socket.on('msg', function(message){

		var conn = new Client();
		conn.on('ready', function() {
			console.log('Client :: ready');
			//r.on('line', (input) => {
				conn.shell(function(err, stream) {
					stream.on('data', function(data) {
						console.log(''+data);
						socket.emit('chat', data);
					})
					stream.write(message+'\n');
				});
			//});
		}).connect({
			host: 'www.sopad.ml',
			port: 8001,
			username: 'root',
			password: 'syspwd128'
		});
			
	});
});

server.listen(8080, function(){
	console.log (' socket 4000 listen');
});
