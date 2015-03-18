var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var docSchema = mongoose.Schema({
  domain:  String,
  next_page_id:  String,
  url:  String,
  short_url:  String,
  author:  String,
  excerpt:  String,
  direction:  String,
  word_count:  Number,
  total_pages:  Number,
  content:  String,
  date_published:  String,
  dek:  String,
  lead_image_url:  String,
  title:  String,
  rendered_pages:  String,
});

var Doc = mongoose.model('Doc', docSchema);

module.exports = Doc;
