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
var home_component_1 = require('./home.component');
var login_component_1 = require('./login.component');
var user_services_1 = require('./services/user.services');
var router_deprecated_1 = require('@angular/router-deprecated');
var App = (function () {
    function App(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    App.prototype.ngOnInit = function () {
        //Check if user is auth
        if (this.userService.isAuth()) {
            this.router.navigate(['Home']);
        }
        else {
            this.router.navigate(['Login']);
        }
    };
    App.prototype.isAuth = function () {
        return this.userService.isAuth();
    };
    App = __decorate([
        core_1.Component({
            selector: 'my-instagram',
            template: '<router-outlet></router-outlet>',
            directives: [router_deprecated_1.RouterOutlet, home_component_1.HomeComponent, login_component_1.LoginComponent],
            providers: [user_services_1.UserService]
        }),
        router_deprecated_1.RouteConfig([
            { path: '...', name: "Home", component: home_component_1.HomeComponent, useAsDefault: true },
            { path: '/login', name: "Login", component: login_component_1.LoginComponent }
        ]), 
        __metadata('design:paramtypes', [user_services_1.UserService, router_deprecated_1.Router])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.component.js.map