var express = require('express');
var router = express.Router();
const URL = require('url');
let User = require('./user');
const mysql = require("mysql");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

router.get('/userInfo', function(req, resp, next) {
  let user = new User();
  let params = URL.parse(req.url, true).query;
  console.log(params);

  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "platform_game"
  })
  connection.connect();
  let returnData;
  
  let sql = "select username, score, highscore from user";
  connection.query(sql, ["1"], function(err, res, fields) {
    if(err) throw err;
    console.log("res = " );
    console.log(res);
    resp.send("completed, res = " + JSON.stringify(res));
    
  })

  connection.end();
  
})

/* 
test mysql query:
connection.query("select 1 + 1 from user", [], function(err, res, fields) {
  if(err) throw err;
  console.log("res = " + res);
})
*/