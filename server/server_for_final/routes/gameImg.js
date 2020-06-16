var express = require('express');
var router = express.Router();
let path = require('path');

router.get('/:name', function(req, res, next) {
  let options = {
    root: path.join(__dirname, '../public/web/img')
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