const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('*', function(req, res, next){
    fs.readdir('./data', function(error, filelist){
      req.list = filelist;
      next();
    });  
});
  
module.exports = router;