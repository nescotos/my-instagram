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
var Observable_1 = require('rxjs/Observable');
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var router_deprecated_1 = require('@angular/router-deprecated');
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var CommentService = (function () {
    function CommentService(http, router) {
        this.http = http;
        this.router = router;
    }
    CommentService.prototype.sendComment = function (photoId, comment) {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            headers.append("x-access-token", localStorage.getItem("token"));
            _this.http.post('/api/v1/comment/' + photoId, JSON.stringify({
                content: comment
            }), { headers: headers }).map(function (res) { return res.json(); })
                .subscribe(function (res) {
                //Retrieving the response
                observable.next(res);
            }, function (error) {
                //Checking if error 403
                if (error.status === 403) {
                    //We have no valid token, then redirect to login an clean the token field
                    localStorage.removeItem("token");
                    localStorage.removeItem("id");
                    _this.router.navigateByUrl('/login');
                }
            });
        });
    };
    CommentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_deprecated_1.Router])
    ], CommentService);
    return CommentService;
}());
exports.CommentService = CommentService;
//# sourceMappingURL=comment.services.js.map