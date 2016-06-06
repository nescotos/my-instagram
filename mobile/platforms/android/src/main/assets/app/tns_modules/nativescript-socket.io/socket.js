'use strict';
var helpers = require("./helpers");
var _Emitter = io.socket.emitter.Emitter;
var _IO = io.socket.client.IO;
var _Socket = io.socket.client.Socket;
var _Ack = io.socket.client.Ack;
function connect(uri, options) {
    var socket = new Socket(uri, options || {});
    socket.connect();
    return socket;
}
exports.connect = connect;
var debug = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
};
function defaultDebug() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    args = args.map(function (value) {
        if (typeof value === 'object' && value) {
            try {
                value = JSON.stringify(value);
            }
            catch (e) {
                value = value.toString();
            }
        }
        return value;
    });
    args.unshift('nativescript-socket.io');
    console.log.apply(console, args);
}
function enableDebug(debugFn) {
    if (debugFn === void 0) { debugFn = defaultDebug; }
    debug = debugFn;
}
exports.enableDebug = enableDebug;
function disableDebug() {
    debug = function () { };
}
exports.disableDebug = disableDebug;
var Socket = (function () {
    function Socket(uri, options) {
        if (options === void 0) { options = {}; }
        this._listenerMap = new Map();
        var _options = new _IO.Options();
        if (options) {
            Object.keys(options).forEach(function (prop) {
                _options[prop] = options[prop];
            });
        }
        this.android = _IO.socket(uri, _options);
    }
    Socket.prototype.connect = function () {
        this.android.connect();
    };
    Socket.prototype.disconnect = function () {
        this.android.disconnect();
    };
    Object.defineProperty(Socket.prototype, "connected", {
        get: function () {
            return this.android && this.android.connected();
        },
        enumerable: true,
        configurable: true
    });
    Socket.prototype.on = function (event, callback) {
        var listener = function (args) {
            var payload = Array.prototype.slice.call(args);
            var ack = payload.pop();
            if (typeof ack === 'undefined') {
                ack = null;
            }
            else if (typeof ack === 'object' && ack && !(ack.getClass().getName().indexOf(Socket.SOCKET_CLASS) === 0 && ack.call)) {
                payload.push(ack);
                ack = null;
            }
            payload = payload.map(helpers.deserialize);
            debug('on', event, payload, ack ? 'ack' : '');
            if (ack) {
                var _ack = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    debug('on', event, 'ack', args);
                    args = args.map(helpers.serialize);
                    ack.call(args);
                };
                payload.push(_ack);
            }
            callback.apply(null, payload);
        };
        listener = new _Emitter.Listener({
            call: listener,
        });
        this._listenerMap.set(callback, listener);
        this.android.on(event, listener);
        return this;
    };
    Socket.prototype.off = function (event, listener) {
        debug('off', event, listener);
        if (listener) {
            listener = this._listenerMap.get(listener);
            if (listener) {
                this.android.off(event, listener);
                this._listenerMap.delete(listener);
            }
        }
        else {
            this.android.off(event);
        }
        return this;
    };
    Socket.prototype.emit = function (event) {
        var payload = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payload[_i - 1] = arguments[_i];
        }
        var ack = payload.pop();
        if (typeof ack === 'undefined') {
            ack = null;
        }
        else if (typeof ack !== 'function') {
            payload.push(ack);
            ack = null;
        }
        debug('emit', event, payload, ack ? 'ack' : '');
        payload = payload.map(helpers.serialize);
        if (ack) {
            var _ack = function (args) {
                args = Array.prototype.slice.call(args).map(helpers.deserialize);
                debug('emit', event, 'ack', args);
                ack.apply(null, args);
            };
            _ack = new _Ack({
                call: _ack,
            });
            payload.push(_ack);
        }
        this.android.emit(event, payload);
    };
    Socket.SOCKET_CLASS = 'io.socket.client.Socket';
    return Socket;
}());
exports.Socket = Socket;
//# sourceMappingURL=socket.android.js.map