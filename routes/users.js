var userapi = require('../dataApi/userapi')
var express = require('express');
var router = express.Router();
var passport = require('passport');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });




router.get('/', function(req, res) {
  userapi.getallUsers(function(err, users) {
    res.json(users)
  });
});


router.post('/register', function(req, res) {
  var user = {};
  user.emailId = req.body.emailId;
  user.password = req.body.password;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.location = req.body.location;
  user.mobile = req.body.mobile;
  userapi.saveUser(user, function(err, user) {

    if(err){ 
      res.send(err);               
   } 
   else{       
         res.json({message:"User has been Inserted..!!"});
   }
  });
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);


router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;



