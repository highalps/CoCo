var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://www.sopad.ml:27017/sopad';

var database = {};

database.init = MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("MongoDB 연결");

    db.close();
});

