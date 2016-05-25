var PhotoController = require('../controllers/photoController');
module.exports = function(express){
  var photoApi = express.Router();

  photoApi.route('/photo/:id')
  .get(function(req, res){
    var id = req.params.id;
    PhotoController.getImage(req, res, id);
  });

  photoApi.route('/photo/like/:id')
  .post(function(req, res){
    var id = req.params.id;
    PhotoController.likePhoto(req, res, id);
  });

  photoApi.route('/photo')
  .post(function(req, res){
    PhotoController.createPhoto(req, res);
  })
  .get(function(req, res){
    PhotoController.getAllPhotosByUser(req, res);
  })

  return photoApi;
}
