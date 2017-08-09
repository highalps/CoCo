var http = require('http');
var express = require('express');
var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var editProcess = require('./process');
var Duplex = require('stream').Duplex;
var inherits = require('util').inherits;
var ShareDB = require('sharedb');
var WebSocketServer = require('ws').Server;
var otText = require('ot-text');
var mongoDB = require('mongodb');

var app = express();
var port = 3000;
var devPort = 4001;

var server = http.createServer(app);

if(process.env.NODE_ENV === 'development'){
    console.log('Server is running on development mode');

    var config = require('../webpack.dev.config');
    var compiler = webpack(config);
    var devServer = new webpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

var db = require('sharedb-mongo')({
    mongo: function(callback){
        mongoDB.connect("mongodb://www.sopad.ml:27017/test", callback);
    }
});

ShareDB.types.map['json0'].registerSubtype(otText.type);

var shareDB = ShareDB(db);

var webSocketServer = new WebSocketServer({server: server});

webSocketServer.on('connection', function (socket) {
    var stream = new WebsocketJSONOnWriteStream(socket);
    shareDB.listen(stream);
});

function WebsocketJSONOnWriteStream(socket) {
    Duplex.call(this, {objectMode: true});

    this.socket = socket;
    var stream = this;

    socket.on('message', function(data) {
        stream.push(data);
    });

    socket.on("close", function() {
        stream.push(null);
    });

    this.on("error", function(msg) {
        console.warn('WebsocketJSONOnWriteStream error', msg);
        socket.close();
    });

    this.on("end", function() {
        socket.close();
    });
}
inherits(WebsocketJSONOnWriteStream, Duplex);

WebsocketJSONOnWriteStream.prototype._write = function(value, encoding, next) {
    this.socket.send(JSON.stringify(value));
    next();
};

WebsocketJSONOnWriteStream.prototype._read = function() {};

app.use('/', express.static(__dirname + '/../build'));

// shareDB 처리기
//editProcess.init(server);

app.get('/hello', (req, res) => {
    return res.send('Can you hear me?');
});

server.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log('Express listening on port', port);
});