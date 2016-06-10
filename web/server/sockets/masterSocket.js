var User = require('../models/user');
var UserController = require('../controllers/userController');
var PhotoController = require('../controllers/photoController');
var fs = require('fs');
var path = require('path');
var Photo = require('../models/photo');
var User = require('../models/user');
// var connectedUsers = [];
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
          // connectedUsers.push({socketId : socket.id, id: id});
          // console.log(connectedUsers);
          //Joining to socket for that user.
          socket.join(id);
          //Joining to socket for following users connected
          for(var i = 0; i < user.following.length; i++){
            var currentUserId = user.following[i];
            // for(var j = 0; j < connectedUsers.length; j++){
              //Finding if user is connected
              // if(connectedUsers[j].id == currentUserId){
                //Then join to that socket
                socket.join(currentUserId);
                // break;
              // }
            // }
          }
          console.log('User ' + user.username + ' is in');
        }
      })
    }else{
      console.log('Connection closed because of invalid token');
    }
  });
  socket.on('photo:uploaded', function(data){
    //Verifiyign token
    console.log(data.token);
    var tokenReceived = data.token;
    var decoded = UserController.tokenVerify(tokenReceived);
    if(decoded){
      //Uploading photo and sending info to clients
      //Creating photo model
      var photo = new Photo();
      //If description
      if(data.description){
        photo.description = data.description;
      }
      photo.owner = decoded.id;
      photo.save(function(err){
        if(err){
          console.log('Error uploading photo');
        }else{
          var photoId = photo._id;
          var rawData = data.rawData.replace(/^data:image\/jpeg;base64,/, "");
          fs.writeFile(path.resolve(__dirname + '/../../photos/' + photoId + '.jpg'), rawData, 'base64', function(err){
            if(err){
              console.log(err);
            }else{
              User.update({username : decoded.username }, {$push : {photos : photoId}}, {upsert:true}, function(err){
                if(err){
                  console.log(err);
                  console.log('Error uploading photo');
                }else{
                  socket.in(decoded.id).emit('photo:received', photo);
                }
              });
            }
          });
        }
      });

      console.log('Sending file');
    }else{
      console.log('Unauthorized access to socket!');
    }
  });
  socket.on('disconnect', function(){
      //Delete disconnected user socket
    //  for(var i = 0; i < connectedUsers.length; i++){
    //    if(connectedUsers[0].socketId == socket.id){
    //      //Removing the socket
    //      console.log('Socket ' + connectedUsers[i].socketId + ' deleted!');
    //      connectedUsers = connectedUsers.splice(i, 1);
    //      break;
    //    }
    //  }
    console.log(socket.id,"off");
   });
}
