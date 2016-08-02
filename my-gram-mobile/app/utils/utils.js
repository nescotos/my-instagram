"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var config_1 = require('../config');
var user_services_1 = require('../services/user.services');
var Utils = (function () {
    function Utils(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    Utils.prototype.redirectTo = function (route) {
        this.router.navigate([route]);
    };
    Utils.prototype.getImageURL = function (id) {
        return config_1.Config.APIURL + '/photo/' + id;
    };
    Utils = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, user_services_1.UserService])
    ], Utils);
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map