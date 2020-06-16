var express = require('express');
var router = express.Router();
let path = require('path');

router.get('/:name', function(req, res, next) {
  // console.log(req.params);
  let options = {
    root: path.join(__dirname, '../public/web/css')
  }
  let filename = req.params.name;
  res.sendFile(filename, options, function(err) {
    if(err) {
      next(err);
    }
    else {
      // console.log('Sent: ' + filename);
    }
  });
})

module.exports = router;