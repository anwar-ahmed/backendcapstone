var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

  module.exports = function(passport){
passport.use(new FacebookStrategy({
    clientID: 784574761883624,
    clientSecret: "11d4e1daad62ed83b628e123458aa21e",
    callbackURL: "http://localhost:3000/users/auth/facebook/callback"
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

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});




  }
