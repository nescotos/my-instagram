"use strict";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var application_1 = require("nativescript-angular/application");
var app_component_1 = require("./app.component");
var router_1 = require('nativescript-angular/router');
var http_1 = require('@angular/http');
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var angular_2 = require('nativescript-telerik-ui/listview/angular');
var app_routes_1 = require("./app.routes");
application_1.nativeScriptBootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, router_1.NS_ROUTER_PROVIDERS, angular_1.SIDEDRAWER_PROVIDERS, angular_2.LISTVIEW_PROVIDERS, app_routes_1.APP_ROUTER_PROVIDERS]);
//# sourceMappingURL=main.js.map