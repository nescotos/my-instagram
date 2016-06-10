var FollowController = require('../controllers/followController');

module.exports = function(express){
  var followApi = express.Router();
  followApi.route('/follow')
  .post(function(req, res){
    FollowController.follow(req, res);
  });
  followApi.route('/unfollow')
  .post(function(req, res){
    var id = req.params.id;
    FollowController.unfollow(req, res, id);
  });

  return followApi;
}
