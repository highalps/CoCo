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

router.post('/signup', function(req, res, next) {
    var user = {
        email:req.body.email,
        password:req.body.password,
    };
    req.app.db.collection('users').insertOne(user);
    console.log('signup test', user);
    res.redirect('/login');
});

module.exports = router;
