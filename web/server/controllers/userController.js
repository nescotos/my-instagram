jwt = require('jsonwebtoken');
var config = require('../../config');
var superSecret = config.SUPERSECRET;
var User = require('../models/user');
module.exports = {
    login: function(req, res) {
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
                        token: token,
                        id: user._id
                    });
                }
            }
        });
    },
    register: function(req, res) {
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
                    return res.json({
                        success: false,
                        message: 'A user with that username already exists. '
                    });
                else
                    return res.send(err);
            }
            //Return a message
            res.json({
                message: 'User created succesfully.'
            });
        });
    },
    me: function(req, res) {
        //Retrieving the user
        User.findById(req.decoded.id, function(err, user) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Error ocurred'
                });
            } else {
                //Sending user.
                res.json(user);
            }
        })
    },
    tokenVerify: function(token) {
      //Checking if token is valid
        try {
            var decoded = jwt.verify(token, superSecret);
            return decoded;
        } catch (err) {
            return false;
        }
    },
    userSearch: function(req, res){
      User.find({ $text: {$search : req.params.query}},
      {score : { $meta : 'textScore'}}).sort({score : {$meta : 'textScore'}})
      .limit(10).exec(function(err, users){
        if(err){
          console.log(err);
          res.json({success : false, message : 'Error, try later'});
        }else{
          res.json(users);
        }
      });
    },
    findUserById: function(req, res){
      User.findById(req.params.userId, function(err, user){
        if(err){
          console.log(err);
          res.status(500).json({success : false, message: 'Error, we are sorry'});
        }else{
          res.json(user);
        }
      })
    }
}
