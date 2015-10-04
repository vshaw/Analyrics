'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
// for raw message text

var songSchema = new Schema({
	artist: String,
	title: String,
	emotion: {
		types: {
			type: String
		},
		values:{ value: Number
		}
	}

});


var song = mongoose.model('song', songSchema,'song');

module.exports = song;
