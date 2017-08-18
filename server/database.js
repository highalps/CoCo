var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://www.sopad.ml:27017/sopad';
// MongoClient.connect 결과로 얻은 db를 이 변수에 저장. 각종 operation에서 db를 이 값으로 사용하면 됨.
var db = null;

exports.init = function (callback) {
    MongoClient.connect(url, callback);
};

exports.getInstance = function (emtpy, mongo, mongopoll) {
    db = mongo;
};
