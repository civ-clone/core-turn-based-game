"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.GameResultRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const GameResult_1 = require("./GameResult");
/**
 * Holds the game's `GameResult`: none while the game is being played, and one once it has ended. A registry rather
 * than a field so that it's saved like every other piece of runtime state, and a game (or a save made before this
 * existed) with none has not ended.
 */
class GameResultRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(GameResult_1.default);
    }
    get() {
        const [gameResult] = this.entries();
        return gameResult !== null && gameResult !== void 0 ? gameResult : null;
    }
    // The game has ended and the players haven't yet chosen to keep playing, so the next turn waits.
    pending() {
        const gameResult = this.get();
        return gameResult !== null && !gameResult.scoringComplete();
    }
    register(...entities) {
        // Registering the result it already holds again is fine, as it is for any registry.
        const added = new Set(entities.filter((entity) => !this.includes(entity)));
        if (this.length + added.size > 1) {
            throw new TypeError('A game has one GameResult.');
        }
        super.register(...entities);
    }
}
exports.GameResultRegistry = GameResultRegistry;
exports.instance = new GameResultRegistry();
exports.default = GameResultRegistry;
//# sourceMappingURL=GameResultRegistry.js.map