"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = void 0;
const Engine_1 = require("@civ-clone/core-engine/Engine");
const Turn_1 = require("../../Turn");
const getEvents = (engine = Engine_1.instance) => [
    ...['game:start', 'turn:end'].map((event) => [
        event,
        () => engine.emit('turn:start', Turn_1.instance.increment()),
    ]),
];
exports.getEvents = getEvents;
exports.default = exports.getEvents;
//# sourceMappingURL=start.js.map