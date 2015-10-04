var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var analyzeLyrics = require('./analyzeLyrics.js');
var song = require('./db/songSchema.js');

var mongoose = require('mongoose');
var db = mongoose.connection;

var app = express();

//console.log('in app');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use('/static', express.static(__dirname + '/public'));
var html_dir = './html/';

app.get('/', function(req, res) {
  console.log("got index");
  res.sendfile(html_dir + 'index.html');
});

app.get('/foo', function(req,res,next){
  console.log(req);
  console.log("got request at foo");
  console.log()
  song.find({}).lean().exec( function(err, results){
    console.log(results);
    res.send(results);
  });
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



app.listen(8000);


module.exports = app;
