var express = require('express');
var partials = require('express-partials');
var util = require('./lib/utility');

var handler = require('./lib/request-handler');

var app = express();

// Express server configuration.
app.configure(function() {
  app.set('views', __dirname + '/views'); // this assumes all views are located in a folder named views
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.bodyParser());

  app.use(express.static(__dirname + '/public')); // this assumes all client files are in a folder named public
  app.use(express.cookieParser('ASDFxzhueiioeafsioafsoiaefshefsaiuhfeaihaefsi7fe78y93wfh8afwhi;asefhi'));
  app.use(express.session());

});

// Map routes utilizing request-handler.js

// Serve the index page when the user navigates to 
app.get('/', util.checkUser, handler.renderIndex);
app.post('/addDoc', util.checkUser, handler.readabilityRequest);


// login page routing
app.get('/login', handler.loginUserForm);
app.post('/login', handler.loginUser);

app.get('/logout', handler.logoutUser);

// saving documents
app.get('/documents', util.checkUser, handler.fetchDocs);
app.post('/documents', handler.saveDoc);

// signup page routing
app.get('/signup', handler.signupUserForm);
app.post('/signup', handler.signupUser);

// Export the server configuration
module.exports = app;
