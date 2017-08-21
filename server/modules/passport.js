var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var assert = require('assert');

//serializer와 deseriazlier는 필수로 구현해야 함.

// 인증 후, 사용자 정보를 Session에 저장함
passport.serializeUser(function(user, done) {
    console.log('로그인 성공', user);
    done(null, user);
});

// 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.
passport.deserializeUser(function(user, done) {
    console.log('session 호출', user);
    done(null, user);
});

// 로컬 로그인 시
passport.use('localLogin', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }
    ,function(req, email, password, done) {
        if(email=='hello@naver.com' && password=='world'){
            var user = { 'userid':'hello',
                'email':'hello@naver.com'};
            return done(null,user);
        }else{
            return done(null,false);
        }
    }
));

passport.use('localSignup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
}, function(req, email, password, done) {
    console.log('localSignup', email, password);

    req.app.db.collection('users').insertOne({
            email: email,
            pwd: password
        }, function () {
        console.log('test');
    });
}));

module.exports = passport;