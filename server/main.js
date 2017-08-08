var express = require('express');
var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');

const app = express();
const port = 3000;
const devPort = 4001;

if(process.env.NODE_ENV == 'development'){
    console.log('Server is running on development mode');

    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new webpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

app.use('/', express.static(__dirname + '/../build'));

app.get('/hello', (req, res) => {
    return res.send('Can you hear me?');
});

const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});