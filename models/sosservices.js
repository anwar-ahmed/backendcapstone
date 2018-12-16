const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var sosservicesSchema = new Schema({
    _id: String,
    title: String,
    description: String,
    img: String,
    email: String,
    number: String,
    twitter: String
});

module.exports = mongoose.model('sosservices',sosservicesSchema);