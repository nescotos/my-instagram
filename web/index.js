var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var morgan = require('morgan');
var app = express();
//To grab data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Setting up static folder
// app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname));
//Setting up morgan to log every request
app.use(morgan('dev'));
//Connecting to database
mongoose.connect(config.DATABASE);
//Giving the root of webpage
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
//User Authentication Endpoint
var authApi = require('./server/routes/authApi')(express);
app.use(authApi);
//Listen
app.listen(config.PORT, function(){
  console.log('Server Running on: ' + config.PORT);
});
