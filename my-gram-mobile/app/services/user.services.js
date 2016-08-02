"use strict";
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var http_1 = require("@angular/http");
var router_1 = require('@angular/router');
var appSettings = require("application-settings");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var config_1 = require('../config');
var UserService = (function () {
    function UserService(http, router) {
        this.http = http;
        this.router = router;
    }
    UserService.prototype.login = function (username, password) {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            _this.http.post(config_1.Config.APIURL + '/login', JSON.stringify({
                username: username, password: password
            }), { headers: headers }).map(function (res) { return res.json(); })
                .subscribe(function (res) {
                if (res.code == "404" || res.code == "500") {
                    console.error('Brutal error');
                }
                else {
                    observable.next(res);
                }
            });
        });
    };
    UserService.prototype.logout = function () {
        appSettings.remove("token");
        appSettings.remove("id");
        appSettings.remove("username");
        //Redirect to login
        this.router.navigate(['/login']);
    };
    UserService.prototype.isAuth = function () {
        if (this.getToken()) {
            return true;
        }
        return false;
    };
    UserService.prototype.getToken = function () {
        return appSettings.getString('token');
    };
    UserService.prototype.getId = function () {
        return appSettings.getString('id');
    };
    UserService.prototype.getUsername = function () {
        return appSettings.getString('username');
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map