var ShareDB = require('sharedb');
var WebSocketServer = require('ws').Server;
var otText = require('ot-text');
var mongoDB = require('mongodb');
var WebSocketJSONStream = require('websocket-json-stream');
var ShareDBMongo = require('sharedb-mongo');
var database = require('./database');

exports.init = function (server){
    var webSocketServer = new WebSocketServer({server: server});

    webSocketServer.on('connection', function (socket) {
        var stream = new WebSocketJSONStream(socket);
        shareDB.listen(stream);
    });

    // connection을 새로 만들지 않기 위해 sharedb-mongo의 connection을 전달
    db.getDbs(database.getInstance);
};

var db = new ShareDBMongo({
    mongo: function(callback) {
        database.init(callback);
    }
});

ShareDB.types.map['json0'].registerSubtype(otText.type);

var shareDB = ShareDB({db});