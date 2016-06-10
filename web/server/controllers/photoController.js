var fs = require('fs');
var path = require('path');
var Photo = require('../models/photo');
var User = require('../models/user');
module.exports = {
    getImage: function(req, res, id) {
        //Sendind image
        res.sendFile(path.resolve(__dirname + '/../../photos/' + id + '.jpg'));
    },
    getProfileImage: function(req, res) {
        fs.stat(__dirname + '/../../profile/' + req.params.idUser + '.jpg', function(err, stat) {
            if (err) {
                res.sendFile(path.resolve(__dirname + '/../../profile/default.png'));
            } else {
                res.sendFile(path.resolve(__dirname + '/../../profile/' + req.params.idUser + '.jpg'));
            }

        });
    },
    createPhoto: function(req, res) {
        //Creating photo model
        var photo = new Photo();
        //If description
        if (req.body.description) {
            photo.description = req.body.description;
        }
        console.log(req.decoded);
        photo.owner = req.decoded.id;
        photo.save(function(err) {
            if (err) {
                res.json({
                    success: false,
                    error: 'Ooops'
                });
            } else {
                var photoId = photo._id;
                var rawData = req.body.rawData.replace(/^data:image\/jpeg;base64,/, "");
                fs.writeFile(path.resolve(__dirname + '/../../photos/' + photoId + '.jpg'), rawData, 'base64', function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        User.update({
                            username: req.decoded.username
                        }, {
                            $push: {
                                photos: photoId
                            }
                        }, {
                            upsert: true
                        }, function(err) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    error: 'Ooops'
                                });
                            } else {
                                res.json({
                                    success: true,
                                    message: 'Photo uploaded'
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    createPhotoBySocket: function(data, decoded) {
        //Creating photo model
        var photo = new Photo();
        //If description
        if (data.description) {
            photo.description = data.description;
        }
        photo.owner = decoded.id;
        photo.save(function(err) {
            if (err) {
                console.log('Error uploading photo');
            } else {
                var photoId = photo._id;
                var rawData = data.rawData.replace(/^data:image\/jpeg;base64,/, "");
                fs.writeFile(path.resolve(__dirname + '/../../photos/' + photoId + '.jpg'), rawData, 'base64', function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        User.update({
                            username: decoded.username
                        }, {
                            $push: {
                                photos: photoId
                            }
                        }, {
                            upsert: true
                        }, function(err) {
                            if (err) {
                                console.log(err);
                                console.log('Error uploading photo');
                            } else {
                                return photo;
                            }
                        });
                    }
                });
            }
        });
    },
    likePhoto: function(req, res) {
      var id = req.body.photoId;
        Photo.update({
            _id: id
        }, {
            $push: {
                likes: req.decoded.id
            }
        }, function(err) {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    error: 'Ooops'
                });
            } else {
                res.json({
                    success: true,
                    message: 'Like done!'
                })
            }
        });
    },
    unlikePhoto: function(req, res) {
      var id = req.body.photoId;
        Photo.update({
            _id: id
        }, {
            $pull: {
                likes: req.decoded.id
            }
        }, function(err) {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    error: 'Ooops'
                });
            } else {
                res.json({
                    success: true,
                    message: 'Unlike done!'
                })
            }
        });
    },
    getAllPhotosByUser: function(req, res) {
        Photo.find({
            owner: req.decoded.id
        }, function(err, photos) {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    error: 'Ooops'
                });
            } else {
                res.json(photos);
            }
        });
    },
    deletePhoto: function(req, res, id) {
        //Check if users are equals
        var ownerId;
        Photo.find({
            _id: id
        }, function(err, photo) {
            if (err) {
                console.log(err);
                res.json({
                    success: false
                });
            } else {
                ownerId = photo[0].owner;
                if (ownerId == req.decoded.id) {
                    User.update({
                        _id: req.decoded.id
                    }, {
                        $pull: {
                            photos: id
                        }
                    }, function(err) {
                        if (err) {
                            console.log(err);
                            res.json({
                                success: false,
                                error: 'Ooops'
                            });
                        } else {
                            res.json({
                                succes: true,
                                message: 'Photo deleted!'
                            });
                        }
                    });
                } else {
                    res.status(403).json({
                        message: 'FORBIDDEN'
                    });
                }
            }
        });
    },
    getAllPhotosByWall: function(req, res) {
        //Getting id's from following
        User.findById(req.decoded.id, function(err, user) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Oooops, error; try again later'
                });
            } else {
                var arrayId = [];
                if (user.following) {
                    arrayId = user.following;
                }
                //Pushing the user id
                arrayId.push(req.decoded.id);
                //Query for retrive photos
                Photo.find({
                    owner: {
                        $in: arrayId
                    }
                }).populate('owner').sort({
                    createdAt: -1
                }).exec(function(err, photos) {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'Ooops'
                        });
                    } else {
                        res.json(photos);
                    }
                })
            }
        })
    },
    getFullPhoto: function(req, res) {
        //Getting the photo
        Photo.findById(req.params.id).populate([{
            path: 'comments', populate: {
                path: 'commenter'
            }
        }, { path : 'owner' }]).exec(function(err, photo) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Ooops'
                });
            } else {
                res.json(photo);
            }
        })
    }
}
