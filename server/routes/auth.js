var express = require('express');
var router = express.Router();
var passport = require('../service/passport.js')
    , LocalStrategy = require('passport-local').Strategy;
var db = require('../../mysql/mysqldb.js');
var bcrypt = require('bcrypt');

/*로그인 유저 판단 로직*/
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/sign_in');
};

router.post('/sign_up', function(req,res){

    var hash = bcrypt.hashSync(req.body.password, 10);

    var user = {
        userID : req.body.userID,
        password : hash,
        userEmail : req.body.userEmail,
        nickName : req.body.nickName
    };

    var sql = "select * from USER where userID = ?";

    db.query(sql, req.body.userID, function(err, result){
       if (err) {
           console.log('err:' + err);
       } else{
           if(result.length !== 0){
               res.status(401).send('해당아이디가 이미 존재합니다');
           } else {
               sql = "insert into USER SET ?";
               db.query(sql, user, function(err, result){
                   if (err) {
                       console.log('err :' + err);
                       res.status(401);
                   } else {
                       res.send(200);
                   }
               });
           }
       }
    });

});

router.post('/sign_in', function(req, res, next) {
    passport.authenticate('local', function(err, user) {
        if (err) {
            return next(err); // will generate a 500 error
        }

        // Generate a JSON response reflecting authentication status
        if (! user) {
            return res.status(401).send('해당 유저가 없습니다.');
        }
        req.login(user, function(err){
            if(err){
                return next(err);
            }
            return res.json({userID: user.userID});
        });
    })(req, res, next);
});

router.get('/sign_in', function(req, res){
});

router.get('/logout', function(req,res){
    req.session.destroy();
    req.logout();
    console.log("logout");
});

router.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/#/sopad');
    });


module.exports = router;
