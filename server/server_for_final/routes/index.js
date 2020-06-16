var express = require('express');
var router = express.Router();
let path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  let options = {
    root: path.join(__dirname, '../public/web/')
  }
  res.sendFile('index.html', options, function(err) {
    if(err) {
      next(err);
    }
    else {
      console.log('Sent: index.html');
    }
  });
  // res.se
});

router.get('/index', function(req, res, next) {

})

router.get('/login', function(req, res, next) {
  let options = {
    root: path.join(__dirname, '../public/web/')
  }
  res.sendFile('login.html', options, function(err) {
    if(err) {
      next(err);
    }
    else {
      console.log('Sent: login.html');
    }
  });
})

router.get('/register', function(req, res, next) {
  let options = {
    root: path.join(__dirname, '../public/web/')
  }
  res.sendFile('register.html', options, function(err) {
    if(err) {
      next(err);
    }
    else {
      console.log('Sent: register.html');
    }
  });
})


module.exports = router;
