"use strict";
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var photo_services_1 = require('./services/photo.services');
var socket_services_1 = require('./services/socket.services');
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
var appSettings = require("application-settings");
var cameraModule = require("camera");
var enums = require("ui/enums");
var HomeComponent = (function () {
    function HomeComponent(router, photoService, socket) {
        this.router = router;
        this.photoService = photoService;
        this.socket = socket;
    }
    HomeComponent.prototype.joinSocket = function () {
        this.socket.joinWatchSocket();
    };
    // public sendSocketPhoto(){
    //   this.socket.sendPhoto();
    // }
    HomeComponent.prototype.goLogin = function () {
        this.router.navigate(['Login']);
    };
    HomeComponent.prototype.getToken = function () {
        if (appSettings.getString("token")) {
            alert(appSettings.getString("token"));
        }
        else {
            alert("No token!");
        }
    };
    HomeComponent.prototype.refresh = function (args) {
        // Get reference to the PullToRefresh;
        var pullRefresh = args.object;
        // ONLY USING A TIMEOUT TO SIMULATE/SHOW OFF THE REFRESHING
        setTimeout(function () {
            pullRefresh.refreshing = false;
        }, 1000);
    };
    HomeComponent.prototype.takePhoto = function () {
        var vm = this;
        cameraModule.takePicture({ width: 500, height: 500, keepAspectRatio: true }).then(function (picture) {
            var rawData = picture.toBase64String(enums.ImageFormat.jpeg, 100);
            vm.socket.sendPhoto(rawData);
        });
    };
    HomeComponent.prototype.sendPhoto = function (rawData) {
        this.photoService.sendPhoto(rawData, this.description)
            .subscribe(function (response) {
            if (response) {
                alert(response);
            }
        }, function (error) {
            alert('Error');
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home-component',
            templateUrl: './views/home.component.html',
            providers: [photo_services_1.PhotoService, socket_services_1.SocketService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, photo_services_1.PhotoService, socket_services_1.SocketService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map