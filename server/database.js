var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://www.sopad.ml:27017/sopad';
var instance = null;

exports.init = function (callback) {
    MongoClient.connect(url, callback);
};

exports.getInstance = function (emtpy, mongo, mongopoll) {
    instance = mongo;
};
