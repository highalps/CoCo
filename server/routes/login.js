var express = require('express');
var router = express.Router();
var passport = require('../modules/passport')

router.get('/', function(req, res){
    res.render('login');
});

router.post('/',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
        res.render('home');
    });

router.get('/confirm', function(req, res){
    //var query = { email : req.params.email , password : req.params.password };
    var cursor = req.app.db.getCursor('users');
    cursor.each(function(err,doc){
        if(err){
            console.log(err);
        }else{
            if(doc != null){
                console.log(doc); //로그인 가능한지 확인
            }
        }
    });
});

module.exports = router;