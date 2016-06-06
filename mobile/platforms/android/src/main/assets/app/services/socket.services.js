"use strict";
var core_1 = require('@angular/core');
var SocketIO = require('nativescript-socket.io');
var config_1 = require('../config');
var appSettings = require("application-settings");
var SocketService = (function () {
    function SocketService() {
        this.socket = SocketIO.connect(config_1.Config.APIURL);
        this.socket.on('connect', function () {
            console.log('Connected to Socket');
        });
        if (appSettings.getString("token")) {
            this.token = appSettings.getString("token");
        }
        else {
            alert("Redirect to login...");
        }
    }
    SocketService.prototype.joinWatchSocket = function () {
        this.socket.emit('login', { token: this.token });
    };
    SocketService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SocketService);
    return SocketService;
}());
exports.SocketService = SocketService;
//# sourceMappingURL=socket.services.js.map