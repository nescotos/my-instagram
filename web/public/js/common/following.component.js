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
var FollowingComponent = (function () {
    function FollowingComponent(userService, params) {
        this.userService = userService;
        this.params = params;
    }
    FollowingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getFollowings(this.params.get('id')).subscribe(function (users) {
            if (users) {
                _this.users = users;
            }
        });
    };
    FollowingComponent.prototype.getProfileImageURL = function (id) {
        return '/api/v1/profile/' + id + '?token=' + this.userService.getToken();
    };
    FollowingComponent.prototype.follow = function (array, id) {
        var _this = this;
        this.userService.follow(id).subscribe(function (follow) {
            if (follow['success']) {
                array.push(_this.userService.getId());
            }
        });
    };
    FollowingComponent.prototype.unfollow = function (array, id) {
        var _this = this;
        this.userService.unfollow(id).subscribe(function (follow) {
            if (follow['success']) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == _this.userService.getId()) {
                        array['followers'].splice(i, 1);
                        break;
                    }
                }
            }
        });
    };
    FollowingComponent.prototype.canFollow = function (array) {
        return (array.indexOf(this.userService.getId()) < 0);
    };
    FollowingComponent = __decorate([
        core_1.Component({
            selector: 'follower-component',
            templateUrl: 'public/pages/common/search.component.html',
            directives: [router_deprecated_1.RouterLink]
        }), 
        __metadata('design:paramtypes', [user_services_1.UserService, router_deprecated_1.RouteParams])
    ], FollowingComponent);
    return FollowingComponent;
}());
exports.FollowingComponent = FollowingComponent;
//# sourceMappingURL=following.component.js.map