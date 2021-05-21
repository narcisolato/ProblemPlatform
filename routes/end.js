const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
    var notfind = `<img src="/images/404.jpg" height=100% />`
    res.status(404).send(notfind);
  });
  
router.use(function(err, req, res, next) { 
    var servererr = `<img src="/images/500.jpg" height=100% />` 
    console.error(err.stack);
    res.status(500).send(servererr);
}); 

module.exports = router;