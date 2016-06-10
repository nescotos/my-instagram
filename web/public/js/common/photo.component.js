"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var photos_services_1 = require('../services/photos.services');
var comment_services_1 = require('../services/comment.services');
var user_services_1 = require('../services/user.services');
var router_deprecated_1 = require('@angular/router-deprecated');
var TimeAgoPipe_1 = require('angular2-moment/TimeAgoPipe');
var PhotoComponent = (function () {
    function PhotoComponent(params, photoService, userService, commentService) {
        var _this = this;
        this.params = params;
        this.photoService = photoService;
        this.userService = userService;
        this.commentService = commentService;
        this.myComments = [];
        var id = params.get('id');
        this.photoService.getFullPhoto(id).subscribe(function (photo) {
            if (photo) {
                _this.photo = photo;
            }
        });
    }
    PhotoComponent.prototype.getProfileImageURL = function (id) {
        return '/api/v1/profile/' + id + '?token=' + this.userService.getToken();
    };
    PhotoComponent.prototype.createComment = function () {
        var _this = this;
        this.commentService.sendComment(this.photo['_id'], this.comment).subscribe(function (comment) {
            if (comment['success']) {
                var myComment = { content: _this.comment, createdAt: new Date };
                _this.myComments.push(myComment);
                _this.comment = "";
            }
            else {
                alert('Error');
            }
        });
    };
    PhotoComponent.prototype.likePhoto = function () {
        var _this = this;
        this.userService.like(this.photo['_id']).subscribe(function (like) {
            if (like['success']) {
                _this.photo['likes'].push(_this.userService.getId());
            }
            else {
                alert('Error');
            }
        });
    };
    PhotoComponent.prototype.unlikePhoto = function () {
        var _this = this;
        this.userService.unlike(this.photo['_id']).subscribe(function (like) {
            if (like['success']) {
                for (var i = 0; i < _this.photo['likes'].length; i++) {
                    if (_this.photo['likes'][i] == _this.userService.getId()) {
                        _this.photo['likes'].splice(i, 1);
                    }
                }
            }
            else {
                alert('Error');
            }
        });
    };
    PhotoComponent.prototype.canLike = function () {
        return (this.photo['likes'].indexOf(this.userService.getId()) < 0);
    };
    PhotoComponent = __decorate([
        core_1.Component({
            selector: 'photo-component',
            pipes: [TimeAgoPipe_1.TimeAgoPipe],
            templateUrl: 'public/pages/common/photo.component.html',
            directives: [router_deprecated_1.RouterLink],
            providers: [photos_services_1.PhotoService, user_services_1.UserService, comment_services_1.CommentService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.RouteParams, photos_services_1.PhotoService, user_services_1.UserService, comment_services_1.CommentService])
    ], PhotoComponent);
    return PhotoComponent;
}());
exports.PhotoComponent = PhotoComponent;
//# sourceMappingURL=photo.component.js.map