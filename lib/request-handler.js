var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../appORM/database-conn');
var User = require('../appORM/models/user');

// render the index page
exports.renderIndex = function(req, res) {
  res.render('index');
<<<<<<< HEAD
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

// signupUserForm(request, response) calls for the signup view to be rendered.
exports.signupUserForm = function(req, res) {
  res.render('signup');
};

// signupUser(request, response) creates a new session with the supplied user information
exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}).exec(function(err, user) {
    if (!user) {
      var newUser = new User({
        username: username,
        password: password
      });
      newUser.save(function(err, newUser) {
        util.createSession(req, res, newUser);
      });
    } else {
      console.log('Account already exists');
      res.redirect('/signup');
    }
  })

};
