var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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

module.exports = passport;