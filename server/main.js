var http = require('http');
var express = require('express');
var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var editProcess = require('./process');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash') // session 관련해서 사용됨. 로그인 실패시 session등 클리어하는 기능으로 보임.
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
var devPort = 4001;

var server = http.createServer(app);

//serializer와 deseriazlier는 필수로 구현해야 함.

// 인증 후, 사용자 정보를 Session에 저장함
passport.serializeUser(function(user, done) {
    console.log('serialize');
    done(null, user);
});

// 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.
passport.deserializeUser(function(user, done) {
    //findById(id, function (err, user) {
    console.log('deserialize');
    console.log(user);
    done(null, user);
    //});
});


passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }
    ,function(req,email, password, done) {
        if(email=='hello@naver.com' && password=='world'){
            var user = { 'userid':'hello',
                          'email':'hello@naver.com'};
            return done(null,user);
        }else{
            return done(null,false);
        }
    }
));


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
app.use(bodyParser.urlencoded());
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
resave: false,
saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(__dirname + '/../build'));

// shareDB 처리기
editProcess.init(server);


app.get('/home', function(req, res){
    res.render('home');
});
app.get('/login', function(req,res){
    res.render('login');
});

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
        res.redirect('/login_success');
    });

app.get('/login_success', ensureAuthenticated, function(req, res){
    res.send(req.user);
   // res.render('users', { user: req.user });
});

server.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log('Express listening on port', port);
});

function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) { return next(); }
    // 로그인이 안되어 있으면, login 페이지로 진행
    res.redirect('/');
}
