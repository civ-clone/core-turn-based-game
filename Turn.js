"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.Turn = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class Turn extends DataObject_1.DataObject {
    constructor() {
        super();
        this._value = 0;
        this.addKey('value');
    }
    increment() {
        this._value++;
        return this._value;
    }
    value() {
        return this._value;
    }
}
exports.Turn = Turn;
exports.instance = new Turn();
exports.default = Turn;
//# sourceMappingURL=Turn.js.map