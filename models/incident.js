const mongoose = require('mongoose');
const Schema = mongoose.Schema;






var incidentSchema = new Schema({
    _id: String,
    requestedby: String,
    emailId: String,
    opened: String,
    type: String,
    location: String,
    description: String,
    priority:String,
    status:String
});

module.exports = mongoose.model('incident',incidentSchema);