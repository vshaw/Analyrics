var analyzeLyrics = function (lyrics) {

//	songScore.artist = artist;
//	songScore.songName = songName;

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

	analyzeLyrics.happyScore = happyScore;
	analyzeLyrics.sadScore = sadScore;
	analyzeLyrics.angryScore = angryScore;
	analyzeLyrics.calmScore = calmScore;

	if(happyScore == Math.max(happyScore, sadScore, angryScore, calmScore) && happyScore!= sadScore && happyScore!=angryScore && happyScore!=calmScore) {
		console.log("HAPPY!");
	//	songScore.emotion = "happy";
	analyzeLyrics.emotion = "Happy";
	//	return "Happy!";
	}

	else if(sadScore == Math.max(happyScore, sadScore, angryScore, calmScore) && sadScore!= happyScore && sadScore!=angryScore && sadScore!=calmScore) {
		console.log("SAD!");
		analyzeLyrics.emotion = "Sad";
	//	return "Sad";
	}

	else if(calmScore == Math.max(happyScore, sadScore, angryScore, calmScore) && calmScore!= sadScore && calmScore!=angryScore && happyScore!=calmScore) {
		console.log("CALM!");

		analyzeLyrics.emotion = "Calm";
		//return "Calm";
	}

	else if(angryScore == Math.max(happyScore, sadScore, angryScore, calmScore) && angryScore!= sadScore && happyScore!=angryScore && angryScore!=calmScore) {
		console.log("ANGRY!");

		analyzeLyrics.emotion = "Angry";
	//	return "Angry";
	}
	else {
		console.log("Unclear");
		analyzeLyrics.emotion = "Unclear";
	//	return "Unclear"
	}

	return analyzeLyrics; 
	/*indico.apiKey = '4be98c072e551fca01ffe06337bcfce1';

	indico.sentiment(lyrics)
  	.then(function(res) {
  	  console.log(res);
  }).catch(function(err) {
    console.warn(err);
  });

//} */
}
//analyzeLyrics("Gives You Hell", "All-American Rejects", "I wake up every evening With a big smile on my face hell hell hell");
//console.log(songScore.angryScore);
