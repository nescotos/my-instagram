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
var Observable_1 = require('rxjs/Observable');
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.login = function (username, password) {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            _this.http.post('/login', JSON.stringify({
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
    UserService.prototype.register = function (username, password, name, email) {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            _this.http.post('/register', JSON.stringify({
                username: username, password: password, name: name, email: email
            }), { headers: headers }).map(function (res) { return res.json(); })
                .subscribe(function (res) {
                if (res.code == "404" || res.code == "500") {
                    console.log('Brutal error');
                }
                else {
                    observable.next(res);
                }
            });
        });
    };
    UserService.prototype.findUser = function (userId) {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            headers.append("x-access-token", localStorage.getItem("token"));
            _this.http.get('/api/v1/user/' + userId, { headers: headers }).map(function (res) { return res.json(); })
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
    UserService.prototype.search = function (query) {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            headers.append("x-access-token", localStorage.getItem("token"));
            _this.http.get('/api/v1/search/' + query, { headers: headers }).map(function (res) { return res.json(); })
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
    UserService.prototype.follow = function (followingId) {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            headers.append("x-access-token", localStorage.getItem("token"));
            _this.http.post('/api/v1/follow/', JSON.stringify({ followingId: followingId }), { headers: headers }).map(function (res) { return res.json(); })
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
    UserService.prototype.unfollow = function (followingId) {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            headers.append("x-access-token", localStorage.getItem("token"));
            _this.http.post('/api/v1/unfollow/', JSON.stringify({ followingId: followingId }), { headers: headers }).map(function (res) { return res.json(); })
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
    UserService.prototype.like = function (photoId) {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            headers.append("x-access-token", localStorage.getItem("token"));
            _this.http.post('/api/v1/photo/like', JSON.stringify({ photoId: photoId }), { headers: headers }).map(function (res) { return res.json(); })
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
    UserService.prototype.getFollowers = function (id) {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            headers.append("x-access-token", localStorage.getItem("token"));
            _this.http.get('/api/v1/followers/' + id, { headers: headers }).map(function (res) { return res.json(); })
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
    UserService.prototype.getFollowings = function (id) {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            headers.append("x-access-token", localStorage.getItem("token"));
            _this.http.get('/api/v1/followings/' + id, { headers: headers }).map(function (res) { return res.json(); })
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
    UserService.prototype.unlike = function (photoId) {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            headers.append("x-access-token", localStorage.getItem("token"));
            _this.http.post('/api/v1/photo/unlike', JSON.stringify({ photoId: photoId }), { headers: headers }).map(function (res) { return res.json(); })
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
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("id");
        window.localStorage.removeItem("username");
    };
    UserService.prototype.isAuth = function () {
        if (window.localStorage.getItem("token")) {
            return true;
        }
        return false;
    };
    UserService.prototype.getToken = function () {
        return window.localStorage.getItem("token");
    };
    UserService.prototype.getId = function () {
        return window.localStorage.getItem('id');
    };
    UserService.prototype.getUsername = function () {
        return window.localStorage.getItem('username');
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map