/**
 * Reference: https://github.com/ejones/sharedb-codemirror
 */

var Duplex = require('stream').Duplex;
var inherits = require('util').inherits;
var ShareDB = require('sharedb');
var WebSocketServer = require('ws').Server;
var otText = require('ot-text');
var mongoDB = require('mongodb');

var process = {};
process.init = function (server){
    var webSocketServer = new WebSocketServer({server: server});

    webSocketServer.on('connection', function (socket) {
        var stream = new WebsocketJSONOnWriteStream(socket);
        shareDB.listen(stream);
    });
};

var db = require('sharedb-mongo')({
   mongo: function(callback){
       mongoDB.connect("mongodb://www.sopad.ml:27017/test", callback);
   }
});

ShareDB.types.map['json0'].registerSubtype(otText.type);

var shareDB = ShareDB(db);

function WebsocketJSONOnWriteStream(socket) {
    Duplex.call(this, {objectMode: true});

    this.socket = socket;
    var stream = this;

    socket.on('message', function(data) {
        stream.push(data);
    });

    socket.on("close", function() {
        console.log('?????');
        stream.push(null);
    });

    this.on("error", function(msg) {
        console.warn('WebsocketJnONOnWriteStream error', msg);
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

module.exports = process;