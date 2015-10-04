
var mongoose = require('mongoose');
var app = require('./app.js');
var song = require('./db/songSchema.js');

var analyzeLyrics = function (songName, artist, lyrics) {
	var songScore = new Object();

	songScore.artist = artist; 
	songScore.songName = songName;

	//console.log("loaded!");
	console.log(songName);

	var happyKeywords = ["happy", "sun", "good", "smile", "best", "yeah", "nice"];
	var sadKeywords = ["sad", "cry", "tear", "sorry", "last", "miss", "alone", "lonely", "broken", "cold", "torn", "black", "wrong", "empty"];
	var angryKeywords = ["angary", "hell", "edge", "die", "done", "shit", "fuck", "lies", "bitch", "kill", "hate", "shout"];
	var calmKeywords = ["calm", "relax", "easy", "chill", "alright", "cool"];

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

	/*console.log("happyscore: " + happyScore);
	console.log("sadScore: " + sadScore);
	console.log("angryscore: " + angryScore);
	console.log("calmScore: " + calmScore);*/

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

  console.log(songScore);


//console.log(typeof song);

var response = function(res) { console.log(res); }
var logError = function(err) { console.log(err); }


var songToBeSaved = new song({
  artist: songScore.artist,
  title: songName,
  emotion: songScore.emotion,
  happyScore: songScore.happyScore,
  sadScore: songScore.sadScore,
  angryScore: songScore.angryScore,
  calmScore: songScore.calmScore
});


	var db = mongoose.connection;
	mongoose.connect("mongodb://anna:12345@ds029224.mongolab.com:29224/analyricsdb");
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
	  console.log("success!");
	  songToBeSaved.save(function(err) {
	  if (err){
	    console.log(err);
	    throw err};
	  });
	 
	});

  return songScore;

}


module.exports = analyzeLyrics;

// ######### DUMMY DATA
// analyzeLyrics("Gives You Hell", "All-American Rejects", "When you see my face Hope it gives you hell Hope it gives you hell When you walk my way Hope it gives you hell Hope it gives you hell When you find a man that's worth a damn and treats you well Then he's a fool you're just as well Hope it gives you hell");
// analyzeLyrics("Happy", "Pharrell Williams", "It might seem crazy what I'm about to say Sunshine she's here, you can take away I'm a hot air balloon, I could go to space With the air, like I don't care baby by the way Because I'm happy Clap along if you feel like a room without a roof Clap along if you feel like happiness is the truth Because I'm happy Clap along if you know what happiness is to you Because I'm happy Clap along if you feel like that's what you wanna do");
// analyzeLyrics("Better Together", "Jack Johnson", "There is no combination of words I could put on the back of a postcard No song that I could sing, but I can try for your heart Our dreams, and they are made out of real things Like a, shoebox of photographs With sepia-toned loving Love is the answer, At least for most of the questions in my heart Like why are we here? And where do we go? And how come it's so hard? It's not always easy and Sometimes life can be deceiving I'll tell you one thing, it's always better when we're together Mmm, it's always better when we're together Yeah, we'll look at the stars when we're together Well, it's always better when we're together Yeah, it's always better when we're together");
// analyzeLyrics("I'm Yours", "Jason Mraz", "Well, you done done me and you bet I felt it I tried to be chill, but you're so hot that I melted I fell right through the cracks Now I'm trying to get back Before the cool done run out I'll be giving it my bestest And nothing's gonna stop me but divine intervention. I reckon, it's again my turn To win some or learn some. But I won't hesitate No more, no more. It cannot wait, I'm yours.");
// analyzeLyrics("Relax my Beloved", "Alex Clare", "Relax my beloved, don't worry for me, Don't shed a tear for me always be near for me. Be confident my love don't bow your head for me, Promise you'll smile for me don't ever cry for me. You know these walls they may fall down, But I'll still hold on to you, At heights higher than you'd imagine me too. Then maybe again we would weep like we've done a thousand times before, Don't turn your back on me, or shout as you walk out the door. Relax, relax");
// analyzeLyrics("Tear Drop", "Massive Attack", "Love, love is a verb Love is a doing word Fearless on my breath Gentle impulsion Shakes me, makes me lighter Fearless on my breath Tear drop on the fire Fearless on my breath Night, night after da Black flowers blossom Fearless on my breath Black flowers blossom Fearless on my breath Tear drop on the fire Fearless on my...tear");
// analyzeLyrics("I Hate Everything About You", "Three Days Grace", "Every time we lie awake After every hit we take Every feeling that I get But I haven't missed you yet Every roommate kept awake By every sigh and scream we make All the feelings that I get But I still don't miss you yet Only when I stop to think about it I hate everything about you Why do I love you? I hate everything about you Why do I love you? hate");
// analyzeLyrics("One Step Closer", "Linkin Park", "I cannot take this anymore I'm saying everything I've said before All these words they make no sense I find bliss in ignorance Less I hear the less you'll say But you'll find that out anyway Just like before Everything you say to me Takes me one step closer to the edge And I'm about to break I need a little room to breathe 'Cause I'm one step closer to the edge And I'm about to break");
// analyzeLyrics("The Way I Am", "Eminem", "Whatever...Dre, just let it run Aiyyo turn the beat up a little bit Aiyyo... this song is for anyone... fuck it Just shut up and listen, aiyyo...I sit back with this pack of Zig Zags and this bag Of this weed it gives me the shit needed to be The most meanest MC on this - on this Earth And since birth I've been cursed with this curse to just curse And just blurt this berserk and bizarre shit that works And it sells and it helps in itself to relieve All this tension dispensing these sentences Getting this stress that's been eating me recently off of this chest And I rest again peacefully (peacefully)...But at least have the decency in you To leave me alone, when you freaks see me out In the streets when I'm eating or feeding my daughter");
// analyzeLyrics("Be Calm", "Fun.", "Oh why, Oh why Oh why haven't you been there for me? Can't you see, I'm losing my mind this time? This time I think it's for real, I can see All the tree tops turning red The beggars near bodegas grin at me I think they want something I close my eyes, I tell myself to breathe And be calm. Be calm. I know you feel like you are breaking down. I know that it gets so hard sometimes. Be calm.");
// analyzeLyrics("Cool for the Summer", "Demi Lovato", "Got my mind on your body And your body on my mind Got a taste for the cherry I just need to take a bite Don't tell your mother Kiss one another Die for each other We're cool for the summer Take me down into your paradise Don't be scared 'cause I'm your body type Just something that we wanna try 'Cause you and I We're cool for the summer Tell me if I won If I did What's my prize? I just wanna play with you, too Even if they judge, fuck it I'll do the time I just wanna have some fun with you");
// analyzeLyrics("Yeah", "Joe Nichols", "It was just another night in the hayfield 'Til she climbed down off of them four wheels, Yeah, yeah Soon as that sundress hit the headlights Every tailgate way out there was like yeah, yeah She started walking over to me Like she already knew me Sat down right beside me And asked if I was here alone And I said Yeah, yeah Like I was nodding right along to a song on the radio Yeah, yeah Girl, how could I say no? Whatever you're drinking, that's what I'm drinking Girl, you're calling the shots tonight Whatever you're thinking, that's what I'm thinking Tell me what you got in mind");
// analyzeLyrics("Way Too Much", "Wavves", "Sorry, if I woke you up this morning It was early The sun was coming up and I've been drinking, too much Drinking too much Here I am, I'm just stumbling and I'm looking for a purpose I'm just leaning and it's coming to the surface Too much, always thinking too much This conversations getting boring I've given up and now I'm on the ground Way too much Later on, I don't hope to find myself laid out in pieces I've been scattered and divided for no reason, I don't know And it's hurting so much Holding on, I am crashing for some way to stop this feeling By replacing what I'm feeling, am I sinking? Too much, always thinking too much");
// analyzeLyrics("High and Dry", "Radiohead", "Kill yourself for recognition Kill yourself to never ever stop You broke another mirror You're turning into something you are not Don't leave me high, don't leave me dry Don't leave me high, don't leave me dry Drying up in conversation You will be the one who cannot talk All your insides fall to pieces You just sit there wishing you could still make love They're the ones who'll hate you When you think you've got the world all sussed out They're the once who'll spit at you You'll be the one screaming out");
// analyzeLyrics("When You're Gone","Avril Lavigne", "I always needed time on my own I never thought I'd Need you there when I cry And the days feel like years when I'm alone And the bed where you lie Is made up on your side When you walk away I count the steps that you take Do you see how much I need you right now? When you're gone The pieces of my heart are missin' you When you're gone The face I came to know is missin', too When you're gone The words I need to hear To always get me through the day And make it okay I miss you");
// analyzeLyrics("Torn", "Natalie Imbruglia", "I thought I saw a man brought to life He was warm he came around Like he was dignified He showed me what it was to cry Well, you couldn't be that man I adored You don't seem to know or seem to care What your heart is for I don't know him anymore There's nothing where he used to lie My conversation has run dry That's what's going on Nothing's fine I'm torn I'm all out of faith This is how I feel I'm cold and I am shamed Lying naked on the floor Illusion never changed Into something real I'm wide awake and I can see The perfect sky is torn You're a little late I'm already torn");
// analyzeLyrics("Smile", "Uncle Kracker", "You're better than the best I'm lucky just to linger in your light Cooler then the flip side of my pillow, that's right Completely unaware Nothing can compare to where you send me, Lets me know that it's OK, yeah it's OK And the moments where my good times start to fade You make me smile like the sun Fall out of bed, sing like a bird Dizzy in my head, spin like a record Crazy on a Sunday night You make me dance like a fool Forget how to breathe Shine like gold, buzz like a bee Just the thought of you can drive me wild Oh, you make me smile");
// analyzeLyrics("I Feel Good", "James Brown", "Wo! I feel good, I knew that I would now I feel good, I knew that I would now So good, so good, I got you Wo! I feel nice, like sugar and spice I feel nice, like sugar and spice So nice, so nice, I got you When I hold you in my arms I know that I can do no wrong And when I hold you in my arms My love won't do you no harm And I feel nice, like sugar and spice I feel nice, like sugar and spice So nice, so nice, I got you");
// analyzeLyrics("I Can't Tell You Why", "Eagles", "Look at us baby, up all night Tearing our love apart Aren't we the same two people who live through years in the dark? Every time I try to walk away Something makes me turn around and stay And I can't tell you why When we get crazy, it just ain't to right, (try to keep you head, little girl) Girl, I get lonely, too You don't have to worry Just hold on tight (don't get caught in your little world) 'Cause I love you Nothing's wrong as far as I can see We make it harder than it has to be and I can't tell you why");
// analyzeLyrics("Against All Odds", "Phil Collins", "Well there's just an empty space And there's nothing left here to remind me Just the memory of your face Ooh, Take a look at me now Well there's just an empty space And you coming back to me is against the odds And that's what I've got to face, I wish I could just make you turn around Turn around and see me cry There's so much I need to say to you So many reasons why You're the only one who really knew me at all So take a look at me now Well there's just an empty space And there's nothing left here to remind me Just the memory of your face");
// analyzeLyrics("Chill", "Trey Songz", "Can we get started? I just wanna turn you out, we should leave this party Go some place where them clothes come off and I can see that body Shots got my head spinning round and round, round and round How many drinks will it take me to get you alone baby? Cause a girl like you deserves affection when we're sexing It's a blessing that you came so when you come through You already know what's on my mind We ain't gotta waste no time Come chill with a nigga, come chill with a nigga I know we both gone off the liquor But you should come chill with a nigga Come chill baby, chill baby");
