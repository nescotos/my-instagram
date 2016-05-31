var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var morgan = require('morgan');
var app = express();
//To grab data from POST
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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
//Photos Endpoint
var photoApi = require('./server/routes/photoApi')(express);
app.use('/api/v1', photoApi);
//Follow Endpoint
var followApi = require('./server/routes/followApi')(express);
app.use('/api/v1', followApi);
//Comment Endpoint
var commentApi = require('./server/routes/commentApi')(express);
app.use('/api/v1', commentApi);
//Listen
app.listen(config.PORT, function(){
  console.log('Server Running on: ' + config.PORT);
});
