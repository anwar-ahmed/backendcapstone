var _ = require('lodash');
var Users = require('../models/users');

var userapi = {
    getallUsers: function(callback) {
        Users.find({},function(err,users){
            if (err)
                console.log(err);
            else {
              callback(null,users);
            }
        })      
    },

  getuserbyId: function(id, callback) {
        Users.findOne({ _id: id }, function(err,user){
            if(err)
                console.log(err);
            else {
                callback(null,user)
            }
        })
  },

    saveUser: function(user, callback) {
        var newUser = new Users({
            eamilId: user.emailId,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            mobile: user.mobile
        });

        newUser.save(function(err, user) {
                if (err)
                    return console.log(err);
                else
                    callback(null);
            })           
    }
};
 
module.exports = userapi;