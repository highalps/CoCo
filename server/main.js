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
share.init(server, app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
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

app.get('/project', function(req, res, next){  // 프로젝트의 파일 목록
    //var query = { name:req.params.project };
    var cursor = req.app.db.collection('projects').find();
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
