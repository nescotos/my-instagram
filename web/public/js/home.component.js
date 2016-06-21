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
var header_component_1 = require('./common/header.component');
var main_component_1 = require('./common/main.component');
var profile_component_1 = require('./common/profile.component');
var search_component_1 = require('./common/search.component');
var photo_component_1 = require('./common/photo.component');
var follower_component_1 = require('./common/follower.component');
var following_component_1 = require('./common/following.component');
var router_deprecated_1 = require('@angular/router-deprecated');
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home-component',
            template: "\n    <header-component></header-component>\n    <div class=\"jumbotron\">\n      <router-outlet></router-outlet>\n    </div>\n  ",
            directives: [header_component_1.HeaderComponent, router_deprecated_1.RouterOutlet]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/', name: "Main", component: main_component_1.MainComponent, useAsDefault: true },
            { path: '/user/:userId', name: "Profile", component: profile_component_1.ProfileComponent },
            { path: '/search/:query', name: "Search", component: search_component_1.SearchComponent },
            { path: '/photo/:id', name: 'Photo', component: photo_component_1.PhotoComponent },
            { path: '/followers/:id', name: 'Followers', component: follower_component_1.FollowerComponent },
            { path: '/following/:id', name: 'Followings', component: following_component_1.FollowingComponent }
        ]), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map