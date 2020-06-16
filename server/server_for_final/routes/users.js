var express = require('express');
var router = express.Router();
const URL = require('url');
let User = require('./user');
const mysql = require("mysql");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).send('respond with a resource');
});

router.post('/login', function(req, resp, next) {
  let params = req.body;
  console.log(req.body);
  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "platform_game"
  });
  connection.connect();
  let sql = "select username, score, highscore from user where username = ? and pwd = ?";

  connection.query(sql, [params.username, params.password], function(err, res, fields) {
    if(err) throw err;
    console.log("res = " );
    console.log(res);
    if(res[0] != null) {
      console.log("有记录");
      
      // addCookie("userInfo", {username: res[0].username, highscore: res[0].highscore}, "1h");
      resp.cookie("userInfo", {username: res[0].username, highscore: res[0].highscore});
      resp.status(200).send("completed, res = " + JSON.stringify(res));
    }
    
    
  })
  connection.end();
  // resp.sendStatus()
})

router.post('/logout', function(req, resp, next) {
  resp.clearCookie("userInfo");
  resp.redirect("/");
})

router.post('/register', function(req, resp, next) {
  let params = req.body;
  console.log(req.body);
  if(params.password != params.password2) {
    resp.status(400).send("两次输入的密码不一致");
  }
  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "platform_game"
  });
  connection.connect();
  let sql = "select username from user where username = ?";
  connection.query(sql, [params.username], function(err, res, fields) {
    if(err) throw err;
    if(res[0] != null) {
      console.log("用户名已存在");
      
      resp.status(403).send("用户名已被注册, res = " + JSON.stringify(res));
    }
    else {
      sql = "insert into user(username, pwd) values(?, ?)";
      connection.query(sql, [params.username, params.password], function(err, res, fields) {
        if(err) throw err;
        console.log(res);
        resp.status(201).send("用户创建成功");
      })
    }
    
  });
})

router.get('/user-info', function(req, resp, next) {
  let user = new User();
  let params = URL.parse(req.url, true).query;
  console.log(params);

  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "platform_game"
  });
  connection.connect();
  let returnData;
  
  let sql = "select username, score, highscore from user";
  connection.query(sql, [], function(err, res, fields) {
    if(err) throw err;
    console.log("res = " );
    console.log(res);
    resp.send("completed, res = " + JSON.stringify(res));
    
  })

  connection.end();
  
})
router.get('/high-score', function(req, resp, next) {
  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "platform_game"
  });
  connection.connect();

  let sql = "select username, score, highscore from user where highscore = (select max(highscore) from user)";
  connection.query(sql, [], function(err, res, fields) {
    if(err) throw err;
    console.log("res = ");
    resp.send("completed, res = " + JSON.stringify(res));
  })
  connection.end();
})

router.get('/scores', function(req, resp, next) {
  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "platform_game"
  });
  connection.connect();

  let sql = "select username, highscore from user";
  connection.query(sql, [], function(err, res, fields) {
    if(err) throw err;
    console.log("res = ");
    resp.send("completed, res = <br />" + JSON.stringify(res));
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

module.exports = router;