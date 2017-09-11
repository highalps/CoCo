var ShareDB = require('sharedb');
var WebSocketServer = require('ws').Server;
var otText = require('ot-text');
var WebSocketJSONStream = require('websocket-json-stream');
var ShareDBMongo = require('sharedb-mongo');

var mongoDB = require('mongodb');
//var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://external.sopad.ml:27017/sopad";

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

        // TODO: project 생성부분 완성되면 dummy 생성 부분 지우기
        var dummy = {
            _id: 8001,
            title: 'dummy',
            files: {
                root: {
                    isDirectory: true
                },
                test: {
                    isDirectory: false,
                    type: 'cpp'
                }
            },
            projectType: 'C',
            userList: {}
        };
        mongo.collection('projects').findOne({ _id: 8001 }, function (err, result) {
            if(!result)
                mongo.collection('projects').insertOne(dummy);
        });
    });
};

var db = new ShareDBMongo({
    mongo: function(callback) {
        mongoDB.connect(url, callback);
    }
});

ShareDB.types.map['json0'].registerSubtype(otText.type);
var shareDB = ShareDB({db});
