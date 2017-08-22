var express = require('express');
var router = express.Router();
var passport = require('../modules/passport')

router.get('/', function(req, res, next){
    res.render('login');
});

router.post('/',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(req, res, next) {
        res.render('home');
    });

module.exports = router;
