"use strict";
var Observable_1 = require('rxjs/Observable');
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var config_1 = require('../config');
var appSettings = require("application-settings");
var PhotoService = (function () {
    function PhotoService(http) {
        this.http = http;
    }
    PhotoService.prototype.sendPhoto = function (rawData, description) {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            headers.append("x-access-token", appSettings.getString("token"));
            _this.http.post(config_1.Config.APIV1URL + '/photo', JSON.stringify({
                rawData: rawData, description: description
            }), { headers: headers }).map(function (res) { return res.json(); })
                .subscribe(function (res) {
                if (res.code == "404" || res.code == "500") {
                    console.error('Brutal error');
                }
                else {
                    observable.next(res);
                }
            });
        });
    };
    PhotoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PhotoService);
    return PhotoService;
}());
exports.PhotoService = PhotoService;
//# sourceMappingURL=photo.services.js.map