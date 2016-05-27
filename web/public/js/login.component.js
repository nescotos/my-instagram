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
var user_services_1 = require('./services/user.services');
var LoginComponent = (function () {
    function LoginComponent(userService) {
        this.userService = userService;
        this.username = "";
        this.password = "";
    }
    LoginComponent.prototype.doLogin = function () {
        this.userService.login(this.username, this.password)
            .subscribe(function (token) {
            if (token) {
                //Logic to store token
                alert('Succesful');
                window.localStorage.setItem('token', token['token']);
            }
        }, function (error) {
            alert('Error');
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-component',
            templateUrl: 'public/pages/user/login.component.html',
            providers: [user_services_1.UserService]
        }), 
        __metadata('design:paramtypes', [user_services_1.UserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map