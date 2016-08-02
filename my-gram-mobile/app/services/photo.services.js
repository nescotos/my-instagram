"use strict";
var Observable_1 = require('rxjs/Observable');
var core_1 = require('@angular/core');
var config_1 = require('../config');
var http_1 = require("@angular/http");
var router_1 = require('@angular/router');
var user_services_1 = require('./user.services');
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var PhotoService = (function () {
    function PhotoService(http, router, userService) {
        this.http = http;
        this.router = router;
        this.userService = userService;
    }
    PhotoService.prototype.getAllPhotosByWall = function () {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            headers.append("x-access-token", _this.userService.getToken());
            _this.http.get(config_1.Config.APIV1URL + '/photos', { headers: headers }).map(function (res) { return res.json(); })
                .subscribe(function (res) {
                if (res.code == "404" || res.code == "500") {
                    console.error('Brutal error');
                }
                else if (res.code == "403") {
                    console.log('Unauthorized!');
                }
                else {
                    observable.next(res);
                }
            }, function (error) {
                //Checking if error 403
                if (error.status === 403) {
                    //We have no valid token, then redirect to login an clean the token field
                    _this.userService.logout();
                }
            });
        });
    };
    PhotoService.prototype.getFullPhoto = function (id) {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            headers.append("x-access-token", localStorage.getItem("token"));
            _this.http.get('/api/v1/photoDisplay/' + id, { headers: headers }).map(function (res) { return res.json(); })
                .subscribe(function (res) {
                if (res.code == "404" || res.code == "500") {
                    console.error('Brutal error');
                }
                else if (res.code == "403") {
                    console.log('Unauthorized!');
                }
                else {
                    observable.next(res);
                }
            }, function (error) {
                //Checking if error 403
                if (error.status === 403) {
                    //We have no valid token, then redirect to login an clean the token field
                    localStorage.removeItem("token");
                    localStorage.removeItem("id");
                    localStorage.removeItem("username");
                    _this.router.navigateByUrl('/login');
                }
            });
        });
    };
    PhotoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, user_services_1.UserService])
    ], PhotoService);
    return PhotoService;
}());
exports.PhotoService = PhotoService;
//# sourceMappingURL=photo.services.js.map