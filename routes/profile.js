var userapi = require('../dataApi/userapi')
var express = require('express');
var router = express.Router();

/* GET user profile. */
router.get('/', function(req, res, next) {
  res.send(req.user);
});