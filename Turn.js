"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Turn_value;
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.Turn = void 0;
class Turn {
    constructor() {
        _Turn_value.set(this, 0);
    }
    increment() {
        var _a;
        __classPrivateFieldSet(this, _Turn_value, (_a = __classPrivateFieldGet(this, _Turn_value, "f"), _a++, _a), "f");
        return __classPrivateFieldGet(this, _Turn_value, "f");
    }
    value() {
        return __classPrivateFieldGet(this, _Turn_value, "f");
    }
}
exports.Turn = Turn;
_Turn_value = new WeakMap();
exports.instance = new Turn();
exports.default = Turn;
//# sourceMappingURL=Turn.js.map