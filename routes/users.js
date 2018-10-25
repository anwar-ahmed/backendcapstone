var userapi = require('../dataApi/userapi')
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


// router.post('/register', function(req, res) {
//   var user = {};
//   user.emailId = req.body.emailId;
//   user.password = req.body.password;
//   user.firstName = req.body.firstName;
//   user.lastName = req.body.lastName;
//   user.location = req.body.location;
//   user.mobile = req.body.mobile;
//   userapi.saveUser(user, function(err, user) {

//     if(err){ 
//       res.send(err);               
//    } 
//    else{       
//          res.json({message:"User has been Inserted..!!"});
//    }
//   });
// });



module.exports = function(passport){

	/* Handle Login POST */
  router.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
        if (err) return res.status(500).json({
            message: 'Server Error'
        });
        else if (user) {
            return res.status(200).json({
                user: user
            });
        } else return res.status(500).json({
            message: 'Invalid User'
        });
    })(req, res, next);
  });

	/* Handle Registration POST */
    /* user signup action to save user data in mongodb using passport*/
    router.post('/signup', function(req, res, next) {
      passport.authenticate('signup', function(err, newUser, info) {
          if (err) return res.status(500).json({
              status: 'signup failed'
          });
          else if (newUser) return res.status(200).json({
              status: 'signup success'
          });
          else return res.status(500).json({
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

	return router;
}

