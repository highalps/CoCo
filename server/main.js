var http = require('http');
var express = require('express');
var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var share = require('./share');
var database = require('./database')

var app = express();
var port = 3000;
var devPort = 4001;

var server = http.createServer(app);

if(process.env.NODE_ENV === 'development'){
    console.log('Server is running on development mode');

    var config = require('../webpack.dev.config');
    var compiler = webpack(config);
    var devServer = new webpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

app.use('/', express.static(__dirname + '/../build'));




database.init(function(error, db){ // database init
    if(error) {
      console.log(error);
    }
    app.db = db;  //app.db 초기화
});




app.get('/project', function(req, res){  // 프로젝트의 파일 목록
  //var query = { name:req.params.project };
  var cursor = req.app.db.collection('project').find();
  cursor.each(function(err,doc){
    if(err){
      console.log(err);
    }else{
      if(doc != null){
        console.log(doc);  // doc 은 1개씩 읽어들이는 json
      }
    }
  });
});
app.get('/login/confirm', function(req, res){
  //var query = { email : req.params.email , password : req.params.password };
  var cursor = req.app.db.collection('user').find();
  cursor.each(function(err,doc){
    if(err){
      console.log(err);
    }else{
      if(doc != null){
        console.log(doc); //로그인 가능한지 확인
      }
    }
  });
});





//shareDB 처리기
share.init(server);

server.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log('Express listening on port', port);
});
