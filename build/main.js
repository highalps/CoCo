'use strict';

var express = require('express');
var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');

var app = express();
var port = 3000;
var devPort = 4001;

if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');

    var config = require('../webpack.dev.config');
    var compiler = webpack(config);
    var devServer = new webpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, function () {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

app.use('/', express.static(__dirname + '/../build'));

app.get('/hello', function (req, res) {
    return res.send('Can you hear me?');
});

var server = app.listen(port, function () {
    console.log('Express listening on port', port);
});