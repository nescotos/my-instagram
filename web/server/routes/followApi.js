var FollowController = require('../controllers/followController');

module.exports = function(express){
  var followApi = express.Router();
  followApi.route('/follow/:id')
  .post(function(req, res){
    var id = req.params.id;
    FollowController.follow(req, res, id);
  });
  followApi.route('/unfollow/:id')
  .post(function(req, res){
    var id = req.params.id;
    FollowController.unfollow(req, res, id);
  });

  return followApi;
}
