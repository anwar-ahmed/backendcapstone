const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var notificationSchema = new Schema({
    _id: String,
    type: String,
    opened: String,
    message: String,
    viewed: String
});

module.exports = mongoose.model('notification',notificationSchema);
