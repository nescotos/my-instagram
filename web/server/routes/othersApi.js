var UserController = require('../controllers/userController');

module.exports = function(express){
  var otherApi = express.Router();

  otherApi.route('/search/:query')
  .get(function(req, res){
    UserController.userSearch(req, res);
  });

  otherApi.route('/user/:userId')
  .get(function(req, res){
    UserController.findUserById(req, res);
  })
  //Get followers and followings xD
  otherApi.route('/followers/:id')
  .get(function(req, res){
    UserController.getFollowers(req, res);
  });
  otherApi.route('/followings/:id')
  .get(function(req, res){
    UserController.getFollowings(req, res);
  });

  return otherApi;
}
