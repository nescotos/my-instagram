var User = require('../models/user');

module.exports = {
  follow : function(req, res, id){
    User.update({username : req.decoded.username}, {$push : {following : id}}, function(err){
      if(err){
        console.log(err);
        res.json({success : false, message : 'Ooops'});
      }else{
        User.update({_id : id}, {$push : {followers : req.decoded.id}}, function(err){
          if(err){
            console.log(err);
          }else{
            res.json({success : true, message : 'Following success'});
          }
        })
      }
    });
  },
  unfollow : function(req, res, id){
    User.update({username : req.decoded.username}, {$pull : {following : id}}, function(err){
      if(err){
        console.log(err);
        res.json({success : false, message : 'Ooops'});
      }else{
        User.update({_id : id}, {$pull : {followers : req.decoded.id}}, function(err){
          if(err){
            console.log(err);
          }else{
            res.json({success : true, message : 'Unfollowing success'});
          }
        })
      }
    });
  }
}
