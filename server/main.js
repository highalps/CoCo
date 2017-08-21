var http = require('http');
var express = require('express');
var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var share = require('./modules/share');
var database = require('./modules/database');

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
}


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
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

app.get('/project', function(req, res){  // 프로젝트의 파일 목록
    //var query = { name:req.params.project };
    var cursor = req.app.db.getCursor('projects');
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

//shareDB 처리기
share.init(server);
app.db = database;

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
    socket.emit('data', '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');
});