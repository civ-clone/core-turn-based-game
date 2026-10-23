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
    // Whether the turn loop has stopped between turns: for a game that has ended, until the players keep playing, or
    //  because it was told to hold (an observer's pause, civ-clone/web-renderer#607), until released.
    let waiting = false, held = false;
    const nextTurn = () => {
        engine.emit('turn:start', turn.increment());
    }, 
    // The next turn starts, if one was waiting and nothing keeps it: a game at its ending stays there, and a held game
    //  stays held.
    resume = () => {
        if (!waiting || gameResultRegistry.pending() || held) {
            return;
        }
        waiting = false;
        nextTurn();
    };
    return [
        [
            'engine:start',
            () => {
                ruleRegistry.process(Start_1.default);
            },
        ],
        [
            'game:start',
            () => {
                // A new game isn't waiting on an earlier one's ending, nor held where it was.
                waiting = false;
                held = false;
                nextTurn();
            },
        ],
        [
            'turn:end',
            () => {
                // The turn's `End` rules run before the next turn starts, so they see the turn every player has just finished.
                //  A game they end waits there: nothing moves behind the ending until the players choose to keep playing.
                ruleRegistry.process(End_1.default, turn);
                if (gameResultRegistry.pending() || held) {
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
        // A loaded game picks up where it was, neither waiting on the game loaded before it nor held as that one was: a
        //  hold is for the sitting, and isn't saved. One saved while it was waiting is told so with `turn:wait`, after.
        [
            'game:loaded',
            () => {
                waiting = false;
                held = false;
            },
        ],
        // A game loaded where it was waiting, between turns, waits again. For loads only: a hold is `turn:hold`.
        [
            'turn:wait',
            () => {
                waiting = true;
            },
        ],
        // The players keep playing: the next turn starts if the loop was waiting for it. A game that ended part-way through
        //  a turn (the players retired, say) carries on with that turn instead, so there is nothing to start. Nor does a
        //  held game: it goes on once released.
        ['game:continue', resume],
        // Hold the loop between turns: the turn under way finishes, and the next starts only once released. A game that
        //  has ended stays with its ending until the players keep playing, hold or not.
        [
            'turn:hold',
            () => {
                held = true;
            },
        ],
        [
            'turn:release',
            () => {
                held = false;
                resume();
            },
        ],
    ];
};
exports.getEvents = getEvents;
exports.default = exports.getEvents;
//# sourceMappingURL=start.js.map