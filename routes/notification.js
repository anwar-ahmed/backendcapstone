var express = require('express');
var Notification = require('../models/notification');
var Counters = require('../models/counters');
var router = express.Router();
var auth = require('../passport/isauth')


router.post('/', auth.isAuthenticated,function(req, res) {

  Counters.findOneAndUpdate(
    { _id: "notificationId" },
    { $inc: { seq: 1 } },
    {new:true,upsert: true},
    function(err, doc) {
      new  Notification  ({
        _id: "NOT000"+ doc.seq,
        type: req.body.type,
        emailId: req.body.emailId,
        incidentId: req.body.incidentId,
        opened: req.body.opened,
        message: req.body.message
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


router.get('/', auth.isAuthenticated, function(req, res) {
    Notification.find({},function(err, results, count){
    if(err) {
      res.json({success:false})
    }
   res.json({success:true, data:results});
   });
 }); // get all notification

router.delete('/:id',auth.isAuthenticated,function(req,res,next){
    Notification.remove({'_id': req.params.id},function(err,question){
      if(err) {
        res.json({deleteStatus:'Deleted Question:' +  err });
      } else {
          res.json({deleteStatus:'Deleted Question'});
      }
  })
}); // delete notification record

module.exports = router;
