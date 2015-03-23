var request = require('request');

// isLoggedIn(request, response) checks if the current session's user is logged in.
// Note: this is a helper function for the below checkUser method.
// This method returns a boolean true or false.
exports.isLoggedIn = function(req, res) {
  // Note: req.session.user is typecast to a boolean through the use of !!
  return req.session ? !!req.session.user : false;
};

// checkUser(request, response, next) checks if a user is logged in
//   if so, the callback next is called.
//   otherwise, the client is directed to the login page
exports.checkUser = function(req, res, next) {
  if (!exports.isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
};

// createSession(request, response, newUser) regenerates a session with the supplied newUser as the user
exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      req.session.user = newUser;
      res.redirect('/');
    });
};
