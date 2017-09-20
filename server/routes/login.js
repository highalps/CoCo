var express = require('express');
var router = express.Router();
var passport = require('../service/passport')
var assert = require('assert');

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

	console.log(userID);
	console.log(password);
});

module.exports = router;
