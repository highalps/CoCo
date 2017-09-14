var passport = require('passport');
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
    clientID: "565437120355-6st0a0vdcblkviveld60uppe9hft8h4c.apps.googleusercontent.com",
    clientSecret: "_K5lQEMuHXgHpYn0SYV8YN7T",
    callbackURL: "http://localhost:4001/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
          var query = {
            id:profile.id,
            name:profile.displayName
        };
        console.log("query+ ",query);
        if (profile) {
            database.collection('users').findOne(query, function (err, user) {
                assert.equal(err, null);

                // query에 맞는 유저정보가 없을 때 query 전체 저장
                if(!user){
                    query['projectList'] = [ 8001 ];
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

passport.getDB = function (db) {
    database = db;
}

module.exports = passport;
