var express = require('express');
var partials = require('express-partials');
var util = require('./lib/utility');

var handler = require('./lib/request-handler');

var app = express();

// Express server configuration.
app.configure(function() {
  // app.set('views', __dirname = '/views'); // this assumes all views are located in a folder named views
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.bodyParser());
  // app.use(express.static(__dirname + '/public')); // this assumes all client files are in a folder named public
  // app.use(express.session());

});

// Map routes utilizing request-handler.js

// Serve the index page when the user navigates to 
app.get('/', /*util.checkUser,*/ handler.renderIndex); // checkUser would go here for authentication

// Export the server configuration
module.exports = app;
