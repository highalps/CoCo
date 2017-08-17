var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://www.sopad.ml:27017/sopad';

exports.init = function(callback) {
    MongoClient.connect(url, callback);
};
