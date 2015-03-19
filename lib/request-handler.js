var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');
var request = require('request');

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

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.saveDoc = function(req, res) {

  var url = req.body.url;

  Doc.findOne({ 'url': url }).exec(function(err, found) {
    if (found) {
    // If it is found, update our annotations.
    // (I do realize this could result in overwrites, but I wanted the 
    //  general logic to get squared away first.)

    // req.body.paragraphs is the paragraphs with the updated annotation
    // found.paragraphs is what was found in the database.
    // I cannot get the mongo syntax to update/save/overwrite.

      Doc.update(
        {'url':url}, 
        {
          $set:{
          'paragraphs': req.body.paragraphs
          }
        }, 
        function(err, count, updateInfo){
          console.log(err, count, updateInfo);
        });
    } else {
      if(req.body.next_page_id === undefined){
        return;
      }
      // Otherwise it is a new document and we save it.
      var newDoc = new Doc({
        'domain': req.body.domain,
        'next_page_id': req.body.next_page_id,
        'url': req.body.url,
        'short_url': req.body.short_url,
        'author': req.body.author,
        'excerpt': req.body.excerpt,
        'direction': req.body.direction,
        'word_count': req.body.word_count,
        'total_pages': req.body.total_pages,
        'content': req.body.content,
        'date_published': req.body.date_published,
        'dek': req.body.dek,
        'lead_image_url': req.body.lead_image_url,
        'title': req.body.title,
        'rendered_pages': req.body.rendered_pages,
        'paragraphs': req.body.paragraphs 
      });

      newDoc.save(function(err,newEntry) {
        if (err) {
          res.send(500, err);
        } else {
          res.send(200,newEntry);
        }
      });
    }
  });
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

// Sends request to Readability API from server
exports.readabilityRequest = function(req, res) {
  // Creates Readability API formatted request from input url
  var base = 'https://readability.com/api/content/v1/parser?';
  var url = 'url=' + req.body.url;
  //readability URI = &token=70168518cd8871d294abb9b81799f8efec18e791
  var token = process.env.CUSTOMCONNSTR_READABILITY_URI || '&token=70168518cd8871d294abb9b81799f8efec18e791';
  var readability = base+url+token;

  // Makes request to Readability API
  request(readability, function(error, response, body){
    if (!error && response.statusCode === 200) {
      // Returns response to addDocumentView.js
      res.send(200, body);
      console.log(response);
      console.log(body);
    }
  });

};
