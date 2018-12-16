var express = require('express');
var Sosservice = require('../models/sosservices');
var Counters = require('../models/counters');
var router = express.Router();


router.post('/', function(req, res) {

    Counters.findOneAndUpdate(
    { _id: "sosId" },
    { $inc: { seq: 1 } },
    {new:true,upsert: true},
    function(err, doc) {
      new  Sosservice  ({
        _id: "SOS000"+ doc.seq,
        title: req.body.title,
        description: req.body.description,
        img: req.body.img,
        email: req.body.email,
        number: req.body.number,
        twitter:req.body.twitter
      }).save(function(err,sosservice){
        if (err) {
          res.json({success:false});      
        }
        else  {  
        res.json({success:true});
        }
      })
    });
   }
);// insert incident record with sos service 

module.exports = router;