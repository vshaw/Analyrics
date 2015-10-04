'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
// for raw message text

//var pw = require('./password.js');
//var user = require('./username.js');

var songSchema = new Schema({
  artist: String,
  title: String,
  emotion: String,
  happyScore: Number,
  sadScore: Number,
  angryScore: Number,
  calmScore: Number
});

var song = mongoose.model('song', songSchema,'song');

module.exports = song;

