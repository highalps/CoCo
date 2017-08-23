var bodyParser = require('body-parser');
var http = require('http');
var express = require('express');
var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var share = require('./modules/share');

var app = express();
var port = 3000;
var devPort = 4001;

var server = http.createServer(app);

var passport = require('./modules/passport');
var flash = require('connect-flash'); // session 관련해서 사용됨. 로그인 실패시 session등 클리어하는 기능으로 보임.
var session = require('express-session');

var io = require('socket.io')(server);
var SSHClient = require('ssh2').Client;

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

app.use('/', express.static(__dirname + '/../build'));
app.use('/login', require('./routes/login'));
app.use('/project', require('./routes/project'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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


// function ensureAuthenticated(req, res, next) {
//     // 로그인이 되어 있으면, 다음 파이프라인으로 진행
//     if (req.isAuthenticated()) { return next(); }
//     // 로그인이 안되어 있으면, login 페이지로 진행
//     res.redirect('/login');
// }


io.on('connection', function(socket) {
    var conn = new SSHClient();
    conn.on('ready', function() {
        socket.emit('data', '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');

        conn.shell(function(err, stream) {
            if (err)
                return socket.emit('data', '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n');
            socket.on('command', function(data) {
                stream.write(data + '\n')
            });
            stream.on('data', function(d) {
                socket.emit('data', d.toString('binary'));
            }).on('close', function() {
                conn.end();
            });
        });
    }).on('close', function() {
        socket.emit('data', '\r\n*** SSH CONNECTION CLOSED ***\r\n');
    }).on('error', function(err) {
        socket.emit('data', '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n')
    }).connect({
        host: 'www.sopad.ml',
        port: 8001,
        username: 'root',
        password: 'syspwd128'
    });
})
