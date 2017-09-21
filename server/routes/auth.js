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

/*router.post('/sign_in', function(req,res){
	var userID = req.body.userID,
		password = req.body.password;

	var sql = "select * from USER where userID = ?";
	db.query(sql, userID ,function (err, result){
		if (err) {
			console.log('err :' + err);
		} else {
			if (result.length === 0) {
				res.json({success: false, msg: '해당 아이디가 존재하지 않습니다.'})
			} else {
				//var hash = bcrypt.hashSync(result[0].password, 10);
				if (!bcrypt.compareSync(password, result[0].password)){
					res.json({success: false, msg: '비밀번호가 일치하지 않습니다.'})
				} else {
					res.json({success: true, msg: '로그인 되었습니다'})
				}
			}
		}
	});
});*/

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
               res.json({success: false, msg: '해당아이디가 이미 존재합니다'})
           } else {
               sql = "insert into USER SET ?";
               db.query(sql, user, function(err, result){
                   if (err) {
                       console.log('err :' + err);
                   } else {
                       res.json({success:true, msg:'새 계정을 만들었습니다'})
                   }
               });
           }
       }
    });

});

router.post('/sign_in',
    passport.authenticate(
        'local',
        {
            failureRedirect: '/#/signIn',
            failureFlash: true}
            ), // 인증실패시 401 리턴, {} -> 인증 스트레티지
    function (req, res) {
        var user = req.user;
        console.log(user);
        res.json({success: true, userID: req.user.userID})
    });

router.get('/sign_in', function(req, res){
    //res.json({err: req.flush('err')});
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
