
var express = require('express');
var Nonsosservice = require('../models/nonsosservices');
var Counters = require('../models/counters');
var router = express.Router();
var auth = require('../passport/isauth')

router.post('/',auth.isAuthenticated,function(req, res) {
    Counters.findOneAndUpdate(
    { _id: "nonsosId" },
    { $inc: { seq: 1 } },
    {new:true,upsert: true},
    function(err, doc) {
      new  Nonsosservice  ({
        _id: "NONSOS000"+ doc.seq,
        name: req.body.name
      }).save(function(err,incident){
        if (err) {
          res.json({success:false});      
        }
        else  {  
        res.json({success:true});
        }
      })
    });
   }
);// insert incident record with notification number

module.exports = router;