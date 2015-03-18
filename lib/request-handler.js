var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../appORM/database-conn');
var User = require('../appORM/models/user');
var Doc = require('../appORM/models/docs');

// render the index page
exports.renderIndex = function(req, res) {
  res.render('index');
};

// exports.renderLogin = function(req, res) {
//   res.render(/*'index'*/ 'test'); // placeholder
// };

// loginUserForm(request, response) directs the user to the login page
exports.loginUserForm = function(req, res) {
  res.render('login');
};


exports.fetchDocs = function(req, res) {
  Doc.find({}).exec(function(err,docs) {
    res.send(200, docs);
  });
};

exports.saveDoc = function(req, res) {
  console.log(req);
  // var uri = req.body.url;

  // if (!util.isValidUrl(uri)) {
  //   console.log('Not a valid url: ', uri);
  //   return res.send(404);
  // }

  // Doc.findOne({ url: uri }).exec(function(err, found) {
  //   if (found) {
  //     res.send(200, found);
  //   } else {
  //     util.getUrlTitle(uri, function(err, title) {
  //       if (err) {
  //         console.log('Error reading URL heading: ', err);
  //         return res.send(404);
  //       }
  //       var newDoc = new Doc({
  //         url: uri,
  //         title: title,
  //         base_url: req.headers.origin,
  //         visits: 0
  //       });

  //       newDoc.save(function(err,newEntry) {
  //         if (err) {
  //           res.send(500, err);
  //         } else {
  //           res.send(200,newEntry);
  //         }
  //       });
  //     })
  //   }
  // });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

    User.findOne({username: username}).exec(function(err, user) {
      if (!user) {
        res.redirect('/login');
      } else {
        var savedPassword = user.password;
        User.comparePassword(password, savedPassword, function(err, match) {
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
