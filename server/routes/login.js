var express = require('express');
var router = express.Router();
var passport = require('../modules/passport')


/*
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
*/

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


module.exports = router;
