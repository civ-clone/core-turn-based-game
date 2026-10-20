"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = void 0;
const Engine_1 = require("@civ-clone/core-engine/Engine");
const GameResultRegistry_1 = require("../../GameResultRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Turn_1 = require("../../Turn");
const End_1 = require("../../Rules/End");
const Start_1 = require("@civ-clone/core-engine/Rules/Start");
const Start_2 = require("../../Rules/Start");
const getEvents = (ruleRegistry = RuleRegistry_1.instance, engine = Engine_1.instance, turn = Turn_1.instance, gameResultRegistry = GameResultRegistry_1.instance) => {
    // Whether the turn loop has stopped between turns for a game that has ended, until the players keep playing.
    let waiting = false;
    const nextTurn = () => {
        engine.emit('turn:start', turn.increment());
    };
    return [
        [
            'engine:start',
            () => {
                ruleRegistry.process(Start_1.default);
            },
        ],
        ['game:start', nextTurn],
        [
            'turn:end',
            () => {
                // The turn's `End` rules run before the next turn starts, so they see the turn every player has just finished.
                //  A game they end waits there: nothing moves behind the ending until the players choose to keep playing.
                ruleRegistry.process(End_1.default, turn);
                if (gameResultRegistry.pending()) {
                    waiting = true;
                    return;
                }
                nextTurn();
            },
        ],
        [
            'turn:start',
            () => {
                ruleRegistry.process(Start_2.default, turn);
            },
        ],
        // A game loaded where it was waiting, between turns, waits again.
        [
            'turn:wait',
            () => {
                waiting = true;
            },
        ],
        // The players keep playing: the next turn starts if the loop was waiting for it. A game that ended part-way through
        //  a turn (the players retired, say) carries on with that turn instead, so there is nothing to start.
        [
            'game:continue',
            () => {
                if (!waiting || gameResultRegistry.pending()) {
                    return;
                }
                waiting = false;
                nextTurn();
            },
        ],
    ];
};
exports.getEvents = getEvents;
exports.default = exports.getEvents;
//# sourceMappingURL=start.js.map