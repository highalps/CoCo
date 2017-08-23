var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var assert = require('assert');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var database = null;

//serializer와 deseriazlier는 필수로 구현해야 함.

// 인증 후, 사용자 정보를 Session에 저장함
passport.serializeUser(function(user, done) {
    //console.log('로그인 성공', user);
    done(null, user);
});

// 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.
passport.deserializeUser(function(user, done) {
    //console.log('session 호출', user);
    done(null, user);
});


//구글 로그인
passport.use(new GoogleStrategy({
    clientID: "464986204326-n7e3eaqd5jcsngftdkibkqmjcj5ik76v.apps.googleusercontent.com",
    clientSecret: "BaUiyZgVLXL29RKj-zNxy0Lf",
    callbackURL: "http://localhost:3000/login/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
          var query = {
            id:profile.id,
            name:profile.displayName
          }
           console.log("query+ ",query);
          if (profile) {
              database.collection('users').findOne(query, function (err, user) {
              assert.equal(err, null);
              if(!user){
                database.collection('users').insertOne(query);
              }
            });
            return done(null, profile);
          }
          else {
            return done(null, false);
          }
  }
));
/*
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
*/
passport.getDB = function (db) {
  database = db;
}

module.exports = passport;
