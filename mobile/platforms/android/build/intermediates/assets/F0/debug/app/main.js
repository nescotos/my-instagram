"use strict";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var application_1 = require("nativescript-angular/application");
var app_component_1 = require("./app.component");
var router_deprecated_1 = require('@angular/router-deprecated');
var http_1 = require('@angular/http');
application_1.nativeScriptBootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, router_deprecated_1.ROUTER_PROVIDERS]);
//# sourceMappingURL=main.js.map