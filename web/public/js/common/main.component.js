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
var MainComponent = (function () {
    function MainComponent(photoService) {
        this.photoService = photoService;
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
    MainComponent = __decorate([
        core_1.Component({
            selector: 'main-component',
            templateUrl: 'public/pages/common/main.component.html',
            providers: [photos_services_1.PhotoService]
        }), 
        __metadata('design:paramtypes', [photos_services_1.PhotoService])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map