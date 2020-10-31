var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const AWS = require('aws-sdk');
const fs = require('fs');
const dynamodb = require('dynamodb');

AWS.config.update({
  region: 'us-east-2',
  //endpoint : 'http://localhost:8000'
  accessKeyId:'AKIAIP75QAE4QZMCGZAQ',
  secretAccessKey:'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'
})



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
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

app.listen('2014',()=>{
  console.log("listen port 2014");
})
module.exports = app;
