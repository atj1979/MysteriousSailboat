var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

// render the index page
exports.renderIndex = function(req, res) {
  res.render(/*'index'*/ 'test'); // placeholder
};
