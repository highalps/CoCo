var ShareDB = require('sharedb');
var WebSocketServer = require('ws').Server;
var otText = require('ot-text');
var mongoDB = require('mongodb');
var WebSocketJSONStream = require('websocket-json-stream');
var ShareDBMongo = require('sharedb-mongo');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://www.sopad.ml:27017/sopad";

exports.init = function (server, app, passport){
    var webSocketServer = new WebSocketServer({server: server});

    webSocketServer.on('connection', function (socket) {
        var stream = new WebSocketJSONStream(socket);
        shareDB.listen(stream);
    });

    // sharedb-mongo의 connection을 전달
    db.getDbs(function (emtpy, mongo, mongopoll) {
        app.db = mongo;
        passport.getDB(mongo);
    });
};

var db = new ShareDBMongo({
    mongo: function(callback) {
        MongoClient.connect(url, callback);
    }
});

ShareDB.types.map['json0'].registerSubtype(otText.type);
var shareDB = ShareDB({db});
