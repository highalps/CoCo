var bodyParser = require('body-parser');
var http = require('http');
var express = require('express');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var compression = require('compression')

var app = express();
var port = 3000;
var devPort = 4001;

var server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use('/', express.static(__dirname + '/build'));

if(process.env.NODE_ENV === 'development'){
    console.log('webpack is running on development mode');

    var config = require('./webpack.dev.config');
    var compiler = webpack(config);
    var devServer = new webpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
};

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/build');
});

server.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log('Express listening on port', port);
});