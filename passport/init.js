var login = require('./login');
var signup = require('./signup');
var facebook = require('./facebook')
var User = require('../models/users');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    // passport.serializeUser(function(user, done) {
    //     console.log('serializing user: ');console.log(user);
    //     done(null, user._id);
    //     // done(null, user);
    // });

    // passport.deserializeUser(function(id, done) {
    //     User.findById(id, function(err, user) {
    //         console.log('deserializing user:',user);
    //         done(err, user);
    //     });
        
    // });
    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });
    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);
    facebook(passport);

}

