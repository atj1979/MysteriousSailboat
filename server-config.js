var express = require('express');
var partials = require('express-partials');
// var util = require('./lib/utility');

// var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  // write app.set and app.use here

  // app.set('views', __dirname = '/views'); // this assumes all views are located in a folder named views
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.bodyParser());
  // app.use(express.static(__dirname + '/public')); // this assumes all client files are in a folder named public
  app.use(express.session());

});

  // map routes to request-handler here

module.exports = app;