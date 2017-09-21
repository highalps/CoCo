var express = require('express');
var router = express.Router();
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var db = require('../../mysql/mysqldb.js');
var bcrypt = require('bcrypt');


/*로그인 성공시 사용자 정보를 Session에 저장한다*/
passport.serializeUser(function (user, done) {
    done(null, user)
});

/*인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.*/
passport.deserializeUser(function (user, done) {
    done(null, user);
});

/*로그인 유저 판단 로직*/
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};

router.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/#/sopad');
    });

router.post('/login', function(req,res){
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
					//res.redirect('/');
				}
			}
		}
	});
});

router.post('/auth/login', passport.authenticate('local', {failureRedirect: '/auth/login', failureFlash: true}), // 인증실패시 401 리턴, {} -> 인증 스트레티지
    function (req, res) {
    });

passport.use(new LocalStrategy({
    usernameField: 'userID',
    passwordField: 'password',
    passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
}, function (req, userID, password, done) {
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
                    res.json({success: false, msg : '비밀번호가 일치하지 않습니다.'})
					res.error()
                } else {
                    res.json({success: true, msg: '로그인 되었습니다'})
                }
            }
        }
    });
}));

router.get('/auth/logout', function(req,res){
    req.session.destroy();
    req.logout();
    console.log("logout");
	res.redirect('/');
});


module.exports = router;
