"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endGame = void 0;
const GameOver_1 = require("../Rules/GameOver");
const GameResult_1 = require("../GameResult");
/**
 * End the game, for `reason`, with `winner` (or none). A game ends once: when it already has a result this does
 * nothing and returns `null`, so a ruleset's endings can each be checked every turn, and none fires again after the
 * players keep playing.
 */
const endGame = (reason, winner, gameResultRegistry, ruleRegistry, turn) => {
    if (gameResultRegistry.get() !== null) {
        return null;
    }
    const gameResult = new GameResult_1.default(reason, winner, turn.value());
    gameResultRegistry.register(gameResult);
    ruleRegistry.process(GameOver_1.default, gameResult);
    return gameResult;
};
exports.endGame = endGame;
exports.default = exports.endGame;
//# sourceMappingURL=endGame.js.map