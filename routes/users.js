// var userapi = require('../dataApi/userapi')
var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


// router.get('/', function(req, res) {
//   userapi.getallUsers(function(err, users) {
//     res.json(users)
//   });
// });

module.exports = function(passport){

	/* Handle Login POST */
  router.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
        if (err) return res.json({
            message: 'Server Error'
        });
        else if (user) {
            return res.json({
                user: user,
                message: 'Valid User'
            });
        } else return res.json({
            message: 'Invalid User'
        });
    })(req, res, next);
  });

	/* Handle Registration POST */
    /* user signup action to save user data in mongodb using passport*/
    router.post('/signup', function(req, res, next) {
      passport.authenticate('signup', function(err, newUser, info) {
          if (err) return res.json({
              status: 'signup failed'
          });
          else if (newUser) return res.json({
              status: 'signup success'
          });
          else return res.json({
              status: 'username already exsist'
          });
      })(req, res, next);
  });

	/* Handle Logout */
  router.get('/logout', function(request, response) {
    request.session.destroy(function(req, res, err) {
        if (err) {
            console.log("status of error in logout" + err);
            response.status(500).json({
                status: 'error in logout'
            });
        } else {
            response.status(200).json({
                status: 'success'
            });
        }
    });
});

router.get('/auth/facebook',
 passport.authenticate('facebook'), (req,res) => {
    console.log('not called')
 });


router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: 'https://eismwip.herokuapp.com/landing-page',
                                      failureRedirect: 'https://eismwip.herokuapp.com/login-page' }),(req,res) => {
                                        console.log('red')
                                      });

	return router;
}

