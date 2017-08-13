/**
 * Reference: https://github.com/ejones/sharedb-codemirror
 */

var Duplex = require('stream').Duplex;
var inherits = require('util').inherits;
var ShareDB = require('sharedb');
var WebSocketServer = require('ws').Server;
var otText = require('ot-text');
var mongoDB = require('mongodb');
var WebSocketJSONStream = require('websocket-json-stream');

var process = {};
process.init = function (server){
    var webSocketServer = new WebSocketServer({server: server});

    webSocketServer.on('connection', function (socket) {
        var stream = new WebSocketJSONStream(socket);
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

module.exports = process;