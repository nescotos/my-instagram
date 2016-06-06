"use strict";
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var user_services_1 = require('../../services/user.services');
var appSettings = require("application-settings");
var LoginComponent = (function () {
    function LoginComponent(page, userService) {
        this.page = page;
        this.userService = userService;
        //@ViewChild("email") email: ElementRef;
        //@ViewChild("password") password: ElementRef;
        this.password = "";
        this.username = "";
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        // this.setTextFieldColors();
    };
    LoginComponent.prototype.doLogin = function () {
        this.userService.login(this.username, this.password)
            .subscribe(function (token) {
            if (token) {
                //Checking if we got success in login
                //Logic to store token
                if (token['success']) {
                    appSettings.setString('token', token['token']);
                    // //Redirect
                    // this.router.navigate(['Home']);
                    alert('Login success');
                }
                else {
                    // this.error = token['message'];
                    alert(token['message']);
                }
            }
        }, function (error) {
            alert('Error');
        });
    };
    LoginComponent.prototype.isAuth = function () {
        return this.userService.isAuth();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-component',
            templateUrl: './views/login/login.component.html',
            styleUrls: ["app.css"],
            providers: [user_services_1.UserService]
        }), 
        __metadata('design:paramtypes', [page_1.Page, user_services_1.UserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map