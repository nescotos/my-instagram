"use strict";
var core_1 = require('@angular/core');
var utils_1 = require('../../utils/utils');
var user_services_1 = require('../../services/user.services');
var photo_services_1 = require('../../services/photo.services');
var MainComponent = (function () {
    function MainComponent(utils, userService, photoService) {
        this.utils = utils;
        this.userService = userService;
        this.photoService = photoService;
        this.loading = true;
        this.selectedIndex = 0;
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.photoService.getAllPhotosByWall()
            .subscribe(function (photos) {
            // let myString = JSON.stringify(photos);
            // this.photos = JSON.parse(myString);
            _this.photos = photos;
            _this.loading = false;
        }, function (error) {
            alert('Error');
        });
    };
    MainComponent.prototype.showPhotos = function () {
        alert(this.getPhotos());
    };
    MainComponent.prototype.getPhotos = function () {
        return this.photos[0];
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'main-page',
            templateUrl: './home/main/main.component.html',
            providers: [utils_1.Utils, user_services_1.UserService, photo_services_1.PhotoService]
        }), 
        __metadata('design:paramtypes', [utils_1.Utils, user_services_1.UserService, photo_services_1.PhotoService])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map