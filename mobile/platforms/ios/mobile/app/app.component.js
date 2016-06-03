"use strict";
var core_1 = require("@angular/core");
var router_deprecated_1 = require('@angular/router-deprecated');
var router_1 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var home_component_1 = require('./home.component');
var login_component_1 = require('./views/login/login.component');
var AppComponent = (function () {
    function AppComponent(page) {
        page.actionBarHidden = true;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: './views/app.component.html',
            directives: [router_deprecated_1.RouterOutlet, home_component_1.HomeComponent, login_component_1.LoginComponent, router_1.NS_ROUTER_DIRECTIVES]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/', name: "Home", component: home_component_1.HomeComponent },
            { path: '/login', name: "Login", component: login_component_1.LoginComponent, useAsDefault: true }
        ]), 
        __metadata('design:paramtypes', [page_1.Page])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map