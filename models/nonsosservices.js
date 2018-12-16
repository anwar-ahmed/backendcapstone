const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var nonsosservicesSchema = new Schema({
    _id: String,
    name: String
});

module.exports = mongoose.model('nonsosservices',nonsosservicesSchema);