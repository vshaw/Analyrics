var pw = require('./password.js');
var user = require('./username.js');
var mongoose = require('mongoose');

var song = require('./songSchema.js');

module.exports = function(app) {
  
  var response = function(res) { console.log(res); }
	var logError = function(err) { console.log(err); }

	mongoose.connect("mongodb://" + user + ":" + pw +"@ds029224.mongolab.com:29224/analyricsdb");

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
	  console.log("success!");
	});

	
  app.get('/', function(req,res,next){

    dataConvo.find({}).lean().exec( function(err, results){
    	console.log(results);
      res.send(results);
    });
  })

	/* 
	** Goes through an array of objects and inserts them into the 
	** database
	*/
	var insertRawToDB = function(array){
		
		array = JSON.parse(array);	
		for(var i=0; i<array.length; i++){
			var newObject = new song({ }); // #### PROCESS DATA HERE!
			newObject.save(function(err) {
		    if (err) throw err;;
			});
		};
	};


var loop = function(array,res){
	for(var key in res){
		array.push(key);
	}
}
	
	// CHANGE INPUT VALUES
  var createObject = function(artist, emotion){
   	var newObject = new song( 
   	{
   		artist: artist,
			emotion: emotion
		});

		newObject.save(function(err) {
      if (err && (11000 === err.code || 11001 === err.code)){
      	console.log('Item is already in the database.');
      }
		});
 	};
}
