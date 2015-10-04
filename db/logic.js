var pw = require('./password.js');
var user = require('./username.js');
var mongoose = require('mongoose');
var app = require('../app.js');
var song = require('./songSchema.js').song;

//console.log(typeof song);

var response = function(res) { console.log(res); }
var logError = function(err) { console.log(err); }


/*app.get('/foo', function(req,res,next){
	console.log("got request at foo");
    song.find({}).lean().exec( function(err, results){
  	console.log(results);
    res.send(results);
  });
});*/

var dummySong = new song({
  artist: "String",
  title: "String",
  emotion: {
    body: "String"
    //value: 1
  }
});


var db = mongoose.connection;
mongoose.connect("mongodb://anna:12345@ds029224.mongolab.com:29224/analyricsdb");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("success!");
  dummySong.save(function(err) {
  if (err){
    console.log(err);
    throw err 
  }; 
});
 
});

