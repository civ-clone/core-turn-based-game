"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameResult = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
/**
 * How a game ended: why, who won (if anyone did), and on which turn. An entity so that it's saved with the game.
 *
 * The reason is a stable name a ruleset chooses, such as `conquest` or `retired`, for a renderer to describe it by.
 * Once the players have chosen to keep playing, the scoring is complete: the result stays, and nothing is scored again.
 */
class GameResult extends DataObject_1.DataObject {
    constructor(reason, winner, turn) {
        super();
        this._scoringComplete = false;
        this._reason = reason;
        this._winner = winner;
        this._turn = turn;
        this.addKey('reason', 'scoringComplete', 'turn', 'winner');
    }
    completeScoring() {
        this._scoringComplete = true;
    }
    reason() {
        return this._reason;
    }
    scoringComplete() {
        return this._scoringComplete;
    }
    turn() {
        return this._turn;
    }
    winner() {
        return this._winner;
    }
}
exports.GameResult = GameResult;
exports.default = GameResult;
//# sourceMappingURL=GameResult.js.map