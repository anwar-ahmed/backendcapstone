const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    emailId: String,
    password: String,
    firstName: String,
    lastName: String,
    location: String,
    mobile:String,
    dob:String
});

module.exports = mongoose.model('users',userSchema);