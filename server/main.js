var http = require('http');
var express = require('express');
var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var editProcess = require('./process');

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

// shareDB 처리기
editProcess.init(server);

app.get('/hello', (req, res) => {
    return res.send('Can you hear me?');
});

server.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log('Express listening on port', port);
});
