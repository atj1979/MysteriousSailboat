var mongoose = require('mongoose');
//For local setup/testing, install mongodb using homebrew.  You may need to create a folder called mongodb-data in your file system
//Create a mongodb connection with terminal command 'mongod --dbpath ~/mongodb-data'
//Mongo URI set in Azure as MONGOLAB_URI in the connection string section, which is why the prefex CUSTOMCONNSTR is added.
mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/usr/local/mongodb-data';
mongoose.connect(mongoURI);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});

module.exports = db;
