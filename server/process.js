/**
 * Reference: https://github.com/ejones/sharedb-codemirror
 */

var ShareDB = require('sharedb');
var WebSocketServer = require('ws').Server;
var otText = require('ot-text');
var mongoDB = require('mongodb');
var WebSocketJSONStream = require('websocket-json-stream');
var database = require('./database');

exports.init = function (server){
    var webSocketServer = new WebSocketServer({server: server});

    webSocketServer.on('connection', function (socket) {
        var stream = new WebSocketJSONStream(socket);
        shareDB.listen(stream);
    });
};

var db = require('sharedb-mongo')({
   mongo: function(callback) {
       database.init(callback);
   }
});

ShareDB.types.map['json0'].registerSubtype(otText.type);

var shareDB = ShareDB({db});