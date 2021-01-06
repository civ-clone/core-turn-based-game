"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.Turn = void 0;
const Yield_1 = require("@civ-clone/core-yield/Yield");
class Turn extends Yield_1.Yield {
    add() { }
    addModifier() { }
    increment() {
        super.add(1);
        return this.value();
    }
    set() { }
    subtract() { }
}
exports.Turn = Turn;
exports.instance = new Turn();
exports.default = Turn;
//# sourceMappingURL=Turn.js.map