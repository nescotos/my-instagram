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
var user_services_1 = require('../services/user.services');
var router_deprecated_1 = require('@angular/router-deprecated');
var ProfileComponent = (function () {
    function ProfileComponent(params, userService) {
        var _this = this;
        this.params = params;
        this.userService = userService;
        var userId = this.params.get('userId');
        this.userService.findUser(userId).subscribe(function (user) {
            if (user) {
                _this.user = user;
            }
        });
    }
    ProfileComponent.prototype.ngOnInit = function () {
    };
    ProfileComponent.prototype.follow = function (id) {
        var _this = this;
        this.userService.follow(id).subscribe(function (follow) {
            if (follow['success']) {
                _this.user['followers'].push(_this.userService.getId());
            }
        });
    };
    ProfileComponent.prototype.unfollow = function (id) {
        var _this = this;
        this.userService.unfollow(id).subscribe(function (follow) {
            if (follow['success']) {
                for (var i = 0; i < _this.user['followers'].length; i++) {
                    if (_this.user['followers'][i] == _this.userService.getId()) {
                        _this.user['followers'].splice(i, 1);
                    }
                }
            }
        });
    };
    ProfileComponent.prototype.canFollow = function () {
        return (this.user['followers'].indexOf(this.userService.getId()) < 0);
    };
    ProfileComponent.prototype.getProfileImageURL = function (id) {
        return '/api/v1/profile/' + id + '?token=' + this.userService.getToken();
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile-component',
            templateUrl: 'public/pages/common/profile.component.html',
            directives: [router_deprecated_1.RouterLink]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.RouteParams, user_services_1.UserService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map