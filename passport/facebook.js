var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

  module.exports = function(passport){

  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ facebookId: profile.id }, function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });

    console.log(accessToken, refreshToken, profile, done)
    return done(null, profile);
  }
));






  }
