var express = require('express');
var router = express.Router();
var passport = require('../service/passport');
var db = require('../../mysql/mysqldb.js');
var bcrypt = require('bcrypt');
//var assert = require('assert');

router.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/#/sopad');
    });

router.post('/', function(req,res){
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
				console.log(password);
				console.log(result[0].password);
				var hash = bcrypt.hashSync(result[0].password, 10);
				if (!bcrypt.compareSync(password, hash)){
					res.json({success: false, msg: '비밀번호가 일치하지 않습니다.'})
				} else {
					res.json({success: true, msg: '로그인 되었습니다'})
				}
			}
		}
	});
});

module.exports = router;
