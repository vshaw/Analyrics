console.log("in indico");
var indico = require('indico.io');


var songScore = new Object(); 

var analyzeLyrics = function (songName, artist, lyrics) {

	songScore.artist = artist; 
	songScore.songName = songName;

	console.log("loaded!");

	var happyKeywords = ["happy", "sun", "good", "smile", "best", "love" ];
	var sadKeywords = ["sad", "cry", "tear", "sorry", "last", "miss", "alone", "lonely", "broken"];
	var angryKeywords = ["angry", "hell", "edge", "die", "done", "shit", "fuck", "lies", "bitch"];
	var calmKeywords = ["calm", "relax", "easy", "chill", "alright", "great"];

	var happyScore = 0; 
	var sadScore = 0;
	var angryScore = 0; 
	var calmScore = 0;

	//coutns number 
	for(i = 0; i < happyKeywords.length; i++) {
		var count = (lyrics.match(new RegExp(happyKeywords[i], "g")) || []).length;
		happyScore = happyScore + count;  
	}

	for(i = 0; i < sadKeywords.length; i++) {
		var count = (lyrics.match(new RegExp(sadKeywords[i], "g")) || []).length;
		sadScore = sadScore + count;  
	}

	for(i = 0; i < angryKeywords.length; i++) {
		var count = (lyrics.match(new RegExp(angryKeywords[i], "g")) || []).length;
		angryScore = angryScore + count;  
	}

	for(i = 0; i < calmKeywords.length; i++) {
		var count = (lyrics.match(new RegExp(calmKeywords[i], "g")) || []).length;
		calmScore = calmScore + count;  
	}

	console.log("happyscore: " + happyScore);
	console.log("sadScore: " + sadScore);
	console.log("angryscore: " + angryScore);
	console.log("calmScore: " + calmScore);

	songScore.happyScore = happyScore; 
	songScore.sadScore = sadScore; 
	songScore.angryScore = angryScore; 
	songScore.calmScore = calmScore; 

	if(happyScore == Math.max(happyScore, sadScore, angryScore, calmScore) && happyScore!= sadScore && happyScore!=angryScore && happyScore!=calmScore) {
		console.log("HAPPY!");
		songScore.emotion = "happy"; 
	}

	else if(sadScore == Math.max(happyScore, sadScore, angryScore, calmScore) && sadScore!= happyScore && sadScore!=angryScore && sadScore!=calmScore) {
		console.log("SAD!");
		songScore.emotion = "sad"; 
	}

	else if(calmScore == Math.max(happyScore, sadScore, angryScore, calmScore) && calmScore!= sadScore && calmScore!=angryScore && happyScore!=calmScore) {
		console.log("CALM!");
		songScore.emotion = "calm"; 
	}

	else if(angryScore == Math.max(happyScore, sadScore, angryScore, calmScore) && angryScore!= sadScore && happyScore!=angryScore && angryScore!=calmScore) {
		console.log("ANGRY!");
		songScore.emotion = "angry"; 
	}
	else {
		console.log("Unclear");
	}


	indico.apiKey = '4be98c072e551fca01ffe06337bcfce1';

	indico.sentiment(lyrics)
  	.then(function(res) {
  	  console.log(res);
  }).catch(function(err) {
    console.warn(err);
  });

//} */
}
analyzeLyrics("Gives You Hell", "All-American Rejects", "I wake up every evening With a big smile on my face hell hell hell");
console.log(songScore.angryScore);



