var bodyParser = require('body-parser');
var http = require('http');
var express = require('express');
var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var share = require('./service/share');

var app = express();
var port = 3000;
var devPort = 4001;

var server = http.createServer(app);

var passport = require('./service/passport');
var flash = require('connect-flash'); // session 관련해서 사용됨. 로그인 실패시 session등 클리어하는 기능으로 보임.
var session = require('express-session');

var io = require('socket.io')(server);

if(process.env.NODE_ENV === 'development'){
    console.log('Server is running on development mode');

    var config = require('../webpack.dev.config');
    var compiler = webpack(config);
    var devServer = new webpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
};

// initialize custom module
share.init(server, app, passport);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// TODO: express 라우팅 다시 손보기
app.use('/', express.static(__dirname + '/../build'));
app.use('/api', require('./api'));
app.use('/login', require('./routes/login'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// 없는 경로로 이동할 시
app.use(function(req, res, next) {
    var err = new Error('404 Not Found');
    err.status = 404;
    next(err);
});

app.get('/logout' , function(req, res){
    req.session.destroy();
    req.logout();
    console.log("logout");
    res.redirect('/login');
});

server.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log('Express listening on port', port);
});

// TODO 1: 프로젝트 생성 시 소켓 생성하도록
// TODO 2: 시작 시 모든 포트에 대한 소켓을 열기 or 프로젝트 접속자 파악해서 열고 닫기
var TerminalConnect = require('./service/terminal-connect');

new TerminalConnect(io, 8001);

var updateSocket = require('./service/update-socket');
updateSocket.init(io);