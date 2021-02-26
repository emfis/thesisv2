const { request } = require('express');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  const {login,password} = req.body;
  if(login === "test" && password === "test") {
     return res.status(200).json({token: "token123"});
  }
  return res.status(400).json({error: "Invalid login or password."});
});

module.exports = router;
