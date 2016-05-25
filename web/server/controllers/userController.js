var jwt = require('jsonwebtoken');
var config = require('../../config');
var superSecret = config.SUPERSECRET;
var User = require('../models/user');
module.exports = {
  login : function(req, res){
          	  //Find the user
          	  User.findOne({
          	    username: req.body.username
          	  }).select('name username password').exec(function(err, user) {
          	    if (err) throw err;
          	    //No user with that username was found
          	    if (!user) {
          	      res.json({
          	      	success: false,
          	      	message: 'Invalid username or password'
          	    	});
          	    } else if (user) {
          	      //Check if password matches
          	      var validPassword = user.comparePassword(req.body.password);
          	      if (!validPassword) {
          	        res.json({
          	        	success: false,
          	        	message: 'Invalid username or password'
          	      	});
          	      } else {
          	        //If user is found and password is right create Token
          	        var token = jwt.sign({
          	        	id: user._id,
          	        	username: user.username
          	        }, superSecret, {
                      //Expires in 24 hours
          	          expiresIn: 60 * 60 * 24
          	        });
          	        //Return the information including token as JSON
          	        res.json({
          	          success: true,
          	          message: 'Login Succesful',
          	          token: token
          	        });
          	      }
          	    }
          	  });
            },
  register : function(req, res){
    		      //Create a new instance of the User model
              var user = new User();
              //Set the users name (comes from the request)
        			user.name = req.body.name;
              //Set the users username (comes from the request)
        			user.username = req.body.username;
              //Set the users password (comes from the request)
        			user.password = req.body.password;
              //Set the users email (comes from the request)
        			user.email = req.body.email;
        			user.save(function(err) {
        				if (err) {
        					//Duplicate entry
        					if (err.code == 11000)
        						return res.json({ success: false, message: 'A user with that username already exists. '});
        					else
        						return res.send(err);
        				}
        				//Return a message
        				res.json({ message: 'User created succesfully.' });
        			});
            }
}
