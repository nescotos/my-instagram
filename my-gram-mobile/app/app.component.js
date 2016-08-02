"use strict";
var core_1 = require("@angular/core");
var user_services_1 = require('./services/user.services');
var router_1 = require("nativescript-angular/router");
var router_2 = require("@angular/router");
var page_1 = require("ui/page");
var AppComponent = (function () {
    function AppComponent(page, userService, router) {
        this.userService = userService;
        this.router = router;
        //Hide Action Bar
        page.actionBarHidden = true;
    }
    AppComponent.prototype.ngOnInit = function () {
        //Redirect if neccesary
        if (this.userService.isAuth()) {
            this.router.navigate(['/home']);
        }
        else {
            this.router.navigate(['/login']);
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
            providers: [user_services_1.UserService],
            directives: [router_1.NS_ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [page_1.Page, user_services_1.UserService, router_2.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map