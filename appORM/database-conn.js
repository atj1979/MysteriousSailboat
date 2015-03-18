var mongoose = require('mongoose');

//Mongo URI set in Azure as MONGOLAB_URI in the connection string section, which is why the prefex  CUSTOMCONNSTR_MONGOLAB_URI is added.
mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/usr/local/mongodb-data';
mongoose.connect(mongoURI);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});

module.exports = db;
