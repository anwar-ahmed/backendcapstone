const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var countersSchema = new Schema({
    _id: String,
    seq: Number

});


module.exports = mongoose.model('counters',countersSchema);

