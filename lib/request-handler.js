var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

// render the index page
exports.renderIndex = function(req, res) {
  res.render(/*'index'*/ 'test'); // placeholder
};

// exports.renderLogin = function(req, res) {
//   res.render(/*'index'*/ 'test'); // placeholder
// };

// loginUserForm(request, response) directs the user to the login page
exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

    User.findOne({username: username}).exec(function(err, user) {
      if (!user) {
        res.redirect('/login');
      } else {
        user.comparePassword(password, function(err, match) {
          if (match) {
            util.createSession(req, res, user);
          } else {
            res.redirect('/login');
          }
        })
      }
  });
};
