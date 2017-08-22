var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var assert = require('assert');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


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


//구글 로그인
passport.use(new GoogleStrategy({
    clientID: "565437120355-6st0a0vdcblkviveld60uppe9hft8h4c.apps.googleusercontent.com",
    clientSecret: "_K5lQEMuHXgHpYn0SYV8YN7T",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

// 로컬 로그인 시
passport.use('local', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }
    ,function(req, email, password, done) {
      var query = {email: email, password:password };

      req.app.db.collection('users').findOne(query, function (err, user) {
          assert.equal(err, null);

          if(!user){
              console.log('정보 없음');
              return done(null, false)
          }
          else{
              return done(null, user)
          }
      });
    }
));

module.exports = passport;
