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
var user_services_1 = require('../services/user.services');
var router_deprecated_1 = require('@angular/router-deprecated');
var TimeAgoPipe_1 = require('angular2-moment/TimeAgoPipe');
var MainComponent = (function () {
    function MainComponent(photoService, userService) {
        this.photoService = photoService;
        this.userService = userService;
        this.newPhotos = [];
        var context = this;
        this.isNewPhotos = false;
        this.socket = io();
        this.socket.on('photo:received', function (data) {
            context.newPhotos.push(data);
            context.isNewPhotos = true;
        });
        //Joining to socket
        this.joinSocket();
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.photoService.getAllPhotosByWall()
            .subscribe(function (photos) {
            if (photos) {
                _this.photos = photos;
            }
        }, function (error) {
            alert('Error');
        });
    };
    MainComponent.prototype.mergeArrays = function () {
        for (var i = 0; i < this.newPhotos.length; i++) {
            this.photos.unshift(this.newPhotos[i]);
        }
        this.newPhotos = [];
        this.isNewPhotos = false;
    };
    MainComponent.prototype.joinSocket = function () {
        this.socket.emit("login", { token: this.userService.getToken() });
    };
    MainComponent.prototype.getProfileImageURL = function (id) {
        return '/api/v1/profile/' + id + '?token=' + this.userService.getToken();
    };
    MainComponent.prototype.likePhoto = function (array, photoId) {
        var _this = this;
        this.userService.like(photoId).subscribe(function (like) {
            if (like['success']) {
                array.push(_this.userService.getId());
            }
            else {
                alert('Error');
            }
        });
    };
    MainComponent.prototype.unlikePhoto = function (array, photoId) {
        var _this = this;
        this.userService.unlike(photoId).subscribe(function (like) {
            if (like['success']) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == _this.userService.getId()) {
                        array.splice(i, 1);
                    }
                }
            }
            else {
                alert('Error');
            }
        });
    };
    MainComponent.prototype.canLike = function (array) {
        return (array.indexOf(this.userService.getId()) < 0);
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'main-component',
            pipes: [TimeAgoPipe_1.TimeAgoPipe],
            templateUrl: 'public/pages/common/main.component.html',
            directives: [router_deprecated_1.RouterLink],
            providers: [photos_services_1.PhotoService, user_services_1.UserService]
        }), 
        __metadata('design:paramtypes', [photos_services_1.PhotoService, user_services_1.UserService])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map