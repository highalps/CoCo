var express = require('express');
var router = express.Router();
var passport = require('../modules/passport')

router.get('/', function(req, res, next){
    res.render('login');
});

router.post('/',
    passport.authenticate('localLogin', { failureRedirect: '/login', failureFlash: true }),
    function(req, res, next) {
        res.render('home');
    });

router.post('/signup', passport.authenticate('localSignup', { failureRedirect: '/login', failureFlash: true }),
    function(req, res, next) {
        console.log(req.body);
    });

router.get('/confirm', function(req, res, next){
    //var query = { email : req.params.email , password : req.params.password };
    var cursor = req.app.db.collection('users').find();
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