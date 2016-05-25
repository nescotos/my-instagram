var Comment = require('../models/comment');
var Photo = require('../models/photo');
module.exports = {
  createComment : function(req, res, id){
                    var comment = new Comment();
                    comment.content = req.body.content;
                    comment.commenter = req.decoded.id;
                    comment.save(function(err){
                      if(err){
                        console.log(err);
                        res.json({success : false, message : 'Ooops'});
                      }else{
                        Photo.update({_id : id}, {$push : {comments : comment._id}}, function(err){
                          if(err){
                            console.log(err);
                            res.json({success : false, message : 'Ooops'});
                          }else{
                            res.json({success : true, message: 'Commment succesfuly sent'});
                          }
                        });
                      }
                    });
                  },
    getCommentsByPhoto : function(req, res, id){
                            Photo.find({_id : id}, function(err, photo) {
                              if(err){
                                console.log(err);
                                res.json({success : false, message : 'Ooops'});
                              }else{
                                var commentsId = photo[0].comments;
                                Comment.find({_id : {$in : commentsId}}, function(err, comments){
                                  if(err){
                                    console.log(err);
                                    res.json({success : false, message : 'Ooops'});
                                  }else{
                                    res.json(comments);
                                  }
                                })
                              }
                            });
                          }
}
