"use strict";
var router_1 = require("nativescript-angular/router");
var login_component_1 = require("./login/login.component");
var home_component_1 = require('./home/home.component');
var main_component_1 = require('./home/main/main.component');
exports.routes = [
    { path: "login", component: login_component_1.LoginComponent },
    { path: "home", component: home_component_1.HomeComponent, children: [
            { path: "", component: main_component_1.MainComponent }
        ] },
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.nsProvideRouter(exports.routes, {})
];
//# sourceMappingURL=app.routes.js.map