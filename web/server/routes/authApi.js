var UserController = require('../controllers/userController');
module.exports = function(express){
  //Creating router for handle HTTP Request
  var authApi = express.Router();
  //Using route to Login
  authApi.post('/login', function(req, res){
    UserController.login(req, res);
  });
  authApi.post('/register', function(req, res){
    UserController.register(req, res);
  });

  return authApi;
}
