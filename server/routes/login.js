var express = require('express');
var router = express.Router();
var passport = require('../modules/passport')
var assert = require('assert');

router.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/#/sopad');
    });

module.exports = router;
