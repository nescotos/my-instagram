"use strict";
var core_1 = require("@angular/core");
var router_deprecated_1 = require('@angular/router-deprecated');
var page_1 = require("ui/page");
var home_component_1 = require('./home.component');
var login_component_1 = require('./login.component');
var AppComponent = (function () {
    function AppComponent(page) {
        page.actionBarHidden = true;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: '<router-outlet></router-outlet>',
            directives: [home_component_1.HomeComponent]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/', name: "Home", component: home_component_1.HomeComponent, useAsDefault: true },
            { path: '/login', name: "Login", component: login_component_1.LoginComponent }
        ]), 
        __metadata('design:paramtypes', [page_1.Page])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map