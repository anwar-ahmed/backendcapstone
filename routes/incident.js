var express = require('express');
var Incident = require('../models/incident');
var Counters = require('../models/counters');
var router = express.Router();


router.post('/', function(req, res) {

  Counters.findOneAndUpdate(
    { _id: "incidentId" },
    { $inc: { seq: 1 } },
    {new:true,upsert: true},
    function(err, doc) {
      new  Incident  ({
        _id: "INC000"+ doc.seq,
        type: req.body.type,
        emailId: req.body.emailId,
        opened: req.body.opened,
        message: req.body.message,
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
);// insert incident record with incident number


router.get('/:searchText',  function(req, res) {
  Incident.find({'description':{'$regex': req.params.searchText,'$options':'i'}},function(err, results, count){
      if(err) {
        res.json({success:false})
      }
      res.json({success:true, data:results});
      });
 }); // get  questions based on searchText

 router.get('/detail/:id',  function(req, res) {
  console.log(req.params.id)
  Incident.findById(req.params.id,function(err, results){
      if(err) {
        res.json({success:false})
      }
      res.json({success:true, data:results});
      });
 }); // get  incident based on id


 router.post('/detail/:id',  function(req, res) {
  console.log(req.params.id)
  Incident.update({_id: req.params.id},{ $set: { status: req.body.status }},function(err, results){
      if(err) {
        res.json({success:false})
      }
      res.json({success:true, data:results});
      });
 }); // get  incident based on id

router.get('/',  function(req, res) {
  Incident.find({},function(err, results, count){
    if(err) {
      res.json({success:false})
    }
   res.json({success:true, data:results});
   });
 }); // get all incident

router.delete('/:id',function(req,res,next){
  Incident.remove({'_id': req.params.id},function(err,question){
      if(err) {
        res.json({deleteStatus:'Deleted Question:' +  err });
      } else {
          res.json({deleteStatus:'Deleted Question'});
      }
  })
}); // delete incident record

module.exports = router;
