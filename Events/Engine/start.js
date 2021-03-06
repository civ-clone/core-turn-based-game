"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = void 0;
const End_1 = require("../../Rules/End");
const Engine_1 = require("@civ-clone/core-engine/Engine");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Start_1 = require("@civ-clone/core-engine/Rules/Start");
const Start_2 = require("../../Rules/Start");
const Turn_1 = require("../../Turn");
const getEvents = (ruleRegistry = RuleRegistry_1.instance, engine = Engine_1.instance) => [
    [
        'engine:start',
        () => {
            ruleRegistry.process(Start_1.Start);
        },
    ],
    ...['game:start', 'turn:end'].map((event) => [
        event,
        () => engine.emit('turn:start', Turn_1.instance.increment()),
    ]),
    [
        'turn:end',
        () => {
            ruleRegistry.process(End_1.End, Turn_1.instance);
        },
    ],
    [
        'turn:start',
        () => {
            ruleRegistry.process(Start_2.Start, Turn_1.instance);
        },
    ],
];
exports.getEvents = getEvents;
exports.default = exports.getEvents;
//# sourceMappingURL=start.js.map