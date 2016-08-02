"use strict";
var core_1 = require('@angular/core');
var user_services_1 = require('../services/user.services');
var router_1 = require('@angular/router');
var appSettings = require("application-settings");
var LoginComponent = (function () {
    function LoginComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.username = "";
        this.password = "";
        this.vPassword = "";
        this.name = "";
    }
    LoginComponent.prototype.doLogin = function () {
        var _this = this;
        this.userService.login(this.username, this.password)
            .subscribe(function (token) {
            if (token) {
                //Checking if we got success in login
                //Logic to store token
                if (token['success']) {
                    appSettings.setString('token', token['token']);
                    appSettings.setString('id', token['id']);
                    appSettings.setString('username', token['username']);
                    //Redirect
                    _this.router.navigate(['/home']);
                }
                else {
                    _this.error = token['message'];
                }
            }
        }, function (error) {
            alert('Error');
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-page',
            templateUrl: './login/login.component.html',
            providers: [user_services_1.UserService]
        }), 
        __metadata('design:paramtypes', [user_services_1.UserService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map