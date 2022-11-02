"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = void 0;
const Engine_1 = require("@civ-clone/core-engine/Engine");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Turn_1 = require("../../Turn");
const End_1 = require("../../Rules/End");
const Start_1 = require("@civ-clone/core-engine/Rules/Start");
const Start_2 = require("../../Rules/Start");
const getEvents = (ruleRegistry = RuleRegistry_1.instance, engine = Engine_1.instance, turn = Turn_1.instance) => [
    [
        'engine:start',
        () => {
            ruleRegistry.process(Start_1.default);
        },
    ],
    ...['game:start', 'turn:end'].map((event) => [
        event,
        () => engine.emit('turn:start', turn.increment()),
    ]),
    [
        'turn:end',
        () => {
            ruleRegistry.process(End_1.default, turn);
        },
    ],
    [
        'turn:start',
        () => {
            ruleRegistry.process(Start_2.default, turn);
        },
    ],
];
exports.getEvents = getEvents;
exports.default = exports.getEvents;
//# sourceMappingURL=start.js.map