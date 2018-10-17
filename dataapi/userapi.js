var _ = require('lodash');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/esim');

 var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Connection error', err);
});

db.once('open', function () {
  console.log('Connected to DB.');
});


var userschema = new mongoose.Schema({
    emailId: String,
    password: String,
    firstName: String,
    lastName: String,
    location: String,
    mobile:String
});
 
var Users = mongoose.model('users',userschema);

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