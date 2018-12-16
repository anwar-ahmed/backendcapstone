const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var notificationSchema = new Schema({
    _id: String,
    type: String,
    emailId: String,
    incidentId: String,
    opened: String,
    message: String
});

module.exports = mongoose.model('notification',notificationSchema);
