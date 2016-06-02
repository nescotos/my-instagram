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
              console.log(req.decoded);
              photo.owner = req.decoded.id;
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
                      Photo.find({owner : req.decoded.id}, function(err, photos){
                        if(err){
                          console.log(err);
                          res.json({success: false, error: 'Ooops'});
                        }else{
                          res.json(photos);
                        }
                      });
                },
    deletePhoto : function(req, res, id){
                    //Check if users are equals
                    var ownerId;
                    Photo.find({_id : id}, function(err, photo){
                      if(err){
                        console.log(err);
                        res.json({success : false});
                      }else{
                        ownerId = photo[0].owner;
                        if(ownerId == req.decoded.id){
                          User.update({_id : req.decoded.id}, {$pull : {photos : id}}, function(err){
                            if(err){
                              console.log(err);
                              res.json({success: false, error: 'Ooops'});
                            }else{
                              res.json({succes: true, message : 'Photo deleted!'});
                            }
                          });
                        }else{
                          res.status(403).json({message : 'FORBIDDEN'});
                        }
                      }
                    });
                  },
      getAllPhotosByWall : function(req, res){
                    //Getting id's from following
                    User.findById(req.decoded.id, function(err, user){
                      if(err){
                        res.json({success : false, message : 'Oooops, error; try again later'});
                      }else{
                        var arrayId = [];
                        if(user.following){
                          arrayId = user.following;
                        }
                        //Pushing the user id
                        arrayId.push(req.decoded.id);
                        //Query for retrive photos
                        Photo.find({owner : {$in : arrayId}}).sort({createdAt: -1}).exec(function(err, photos){
                          if(err){
                            res.json({success : false, message : 'Ooops'});
                          }else{
                            res.json(photos);
                          }
                        })
                      }
                    })
                  }
}
