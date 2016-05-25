var fs = require('fs');
var path = require('path');
var Photo = require('../models/photo');
var User = require('../models/user');
module.exports = {
  getImage : function(req, res, id){
              //Sendind image
              res.sendFile(path.resolve(__dirname + '/../../photos/' + id + '.jpg'));
            },
  createPhoto : function(req, res){
              //Creating photo model
              var photo = new Photo();
              //If description
              if(req.body.description){
                photo.description = req.body.description;
              }
              photo.save(function(err){
                if(err){
                  res.json({success: false, error: 'Ooops'});
                }else{
                  var photoId = photo._id;
                  var rawData = req.body.rawData.replace(/^data:image\/jpeg;base64,/, "");
                  fs.writeFile(path.resolve(__dirname + '/../../photos/' + photoId + '.jpg'), rawData, 'base64', function(err){
                    if(err){
                      console.log(err);
                    }else{
                      User.update({username : req.decoded.username }, {$push : {photos : photoId}}, {upsert:true}, function(err){
                        if(err){
                          console.log(err);
                          res.json({success: false, error: 'Ooops'});
                        }else{
                          res.json({success: true, message:'Photo uploaded'});
                        }
                      });
                    }
                  });
                }
              });
            },
    likePhoto : function(req, res, id){
                  Photo.update({_id : id}, {$push : {likes : req.decoded.id}}, function(err){
                    if(err){
                      console.log(err);
                      res.json({success: false, error: 'Ooops'});
                    }else{
                      res.json({success: true, message: 'Like done!'})
                    }
                  });
                },
    getAllPhotosByUser : function(req, res){
                  User.find({_id : req.decoded.id}, function(err, user){
                    if(err){
                      console.log(err);
                      res.json({success: false, error: 'Ooops'});
                    }else{
                      var photosId = user[0].photos;
                      Photo.find({_id : {$in : photosId}}, function(err, photos){
                        if(err){
                          console.log(err);
                          res.json({success: false, error: 'Ooops'});
                        }else{
                          res.json(photos);
                        }
                      });
                    }
                  })
                }
}
