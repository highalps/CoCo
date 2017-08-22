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

module.exports = router;
