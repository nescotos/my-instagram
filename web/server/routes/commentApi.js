var CommentController = require('../controllers/commentController');

module.exports = function(express){
  var commentApi = express.Router();
  commentApi.route('/comment/:id')
  .post(function(req, res){
    var id = req.params.id;
    CommentController.createComment(req, res, id);
  });
  commentApi.route('/comments/photo/:id')
  .get(function(req, res){
    var id = req.params.id;
    CommentController.getCommentsByPhoto(req, res, id);
  });

  return commentApi;
}
