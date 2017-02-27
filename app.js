var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose/');
var db = mongoose.connect('mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon');
// var records = mongoose.model('records', yourSchema);
var app = express();

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/getRecord', function (req, res, next) {
  var key = 'chp8vgSkJDbyDKAS';//req.body.key || null

  if(!key) {
    res.end('post is empty!');
  }

  var query = db.records.findOne({ 'key': key });

  query.exec(function (err, item) {
    if (err) return handleError(err);
    res.json(item);
  });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
