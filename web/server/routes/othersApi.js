var UserController = require('../controllers/userController');

module.exports = function(express){
  var otherApi = express.Router();

  otherApi.route('/search/:query')
  .get(function(req, res){
    UserController.userSearch(req, res);
  });

  return otherApi;
}
