var pw = require('./password.js');
var user = require('./username.js');
var mongoose = require('mongoose');

mongoose.connect("mongodb://" + user + ":" + pw +"@ds029224.mongolab.com:29224/analyricsdb");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("success!");
});