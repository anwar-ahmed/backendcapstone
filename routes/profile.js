var Users = require('../models/users');
var express = require('express');
var router = express.Router();
var auth = require('../passport/isauth')

/* GET user profile. */
router.get('/:emailId', function(req, res) {

  Users.findOne({ emailId: req.params.emailId }, function(err,user){
    if(err)
    res.json({success:false});
    else {
      res.json({success:true,data:user});
    }
})
  
});

router.put('/:emailId',function(req,res){
  Users.update({ emailId: req.params.emailId }, { $set: { 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    location: req.body.location,
    mobile: req.body.mobile,
    dob: req.body.dob
    }},function(err){
      if(err){
        console.log(err)
        res.json({success:false});
      } else {
        res.json({success:true});
      }
    })
});


module.exports = router;