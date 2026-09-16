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
    /**
     * Put the turn back to where a saved game left it.
     *
     * A save records the turn in its metadata and the `Turn` itself is reachable
     * from no entity, so loading had no way to restore it: a game loaded in a
     * fresh process — a reloaded browser tab, which is exactly how the renderer
     * loads one — resumed at turn 0 with a turn-40 world. In the same process it
     * looked correct only because the loaded game adopted the very `Turn` object
     * the saved one had been counting.
     *
     * The year needs nothing of its own: `Year.value()` is a function of the
     * turn.
     */
    set(value) {
        this._value = value;
    }
    value() {
        return this._value;
    }
}
exports.Turn = Turn;
exports.instance = new Turn();
exports.default = Turn;
//# sourceMappingURL=Turn.js.map