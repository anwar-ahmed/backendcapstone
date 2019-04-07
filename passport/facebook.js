var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

  module.exports = function(passport){
    passport.use(new FacebookStrategy({
      clientID: 431430500962344,
      clientSecret: "7a882241e7a6c34470d948607f71911d",
      callbackURL: "https://backendeim.herokuapp.com/users/auth/facebook/callback"
    },

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
