var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

//============路由信息初始 存放在./routes目录下
var indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let codeRouter = require('./routes/gameCode');
let cssRouter = require('./routes/gameCss');
let imgRouter = require('./routes/gameImg');
let toolRouter = require('./routes/gameTool');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));

app.use('/', indexRouter);
app.use('/code', codeRouter);
app.use('/css', cssRouter);
app.use('/img', imgRouter);
app.use('/tools', toolRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
