var UserController = require('../controllers/userController');
var PhotoController = require('../controllers/photoController');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var superSecret = config.SUPERSECRET;
module.exports = function(express){
  //Creating router for handle HTTP Request
  var authApi = express.Router();
  //Using route to Login
  authApi.post('/login', function(req, res){
    UserController.login(req, res);
  });
  authApi.post('/register', function(req, res){
    UserController.register(req, res);
  });
  //Before Middleware
  authApi.route('/photo/:id')
      .get(function(req, res) {
          var id = req.params.id;
          PhotoController.getImage(req, res, id);
      });
  //Middleware to avoid using the rest of API without Token
  authApi.use(function(req, res, next){
    //Check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];
	  //Decode token
	  if (token) {
	    //Verifies secret and checks exp
	    jwt.verify(token, superSecret, function(err, decoded) {
	      if (err) {
	        res.status(403).send({
	        	success: false,
	        	message: 'Failed to authenticate token.'
	    	});
	      } else {
	        //If everything is good, save to request for use in other routes
	        req.decoded = decoded;
           //Make sure we go to the next routes and don't stop here
	        next();
	      }
	    });
	  } else {
	    //If there is no token
	    //Return an HTTP response of 403 (access forbidden) and an error message
   	 	res.status(403).send({
   	 		success: false,
   	 		message: 'No token provided.'
   	 	});
	  }
  });
  authApi.get('/me', function(req, res){
    //Return the information about the user authenticated by TOKEN
    UserController.me(req, res);
  });
  return authApi;
}
