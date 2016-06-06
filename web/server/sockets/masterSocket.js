var User = require('../models/user');
var UserController = require('../controllers/userController');
module.exports = function(socket){
  socket.on('login', function(data){
    //Verifiyign token
    var tokenReceived = data.token;
    var decoded = UserController.tokenVerify(tokenReceived);
    if(decoded){
      var id = decoded.id;
      User.findById(id, function(err, user){
        if(err){
          console.log(err);
        }else{
          console.log('User ' + user.username + ' is in');
        }
      })
    }else{
      console.log('Connection closed because of invalid token');
    }
  });
  socket.on('disconnect', function(){
     console.log(socket.id);
   });
}
