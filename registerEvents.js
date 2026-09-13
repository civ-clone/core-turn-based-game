"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEvents = void 0;
const Engine_1 = require("@civ-clone/core-engine/Engine");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Turn_1 = require("./Turn");
const start_1 = require("./Events/Engine/start");
const registerEvents = (game) => [...(0, start_1.default)(game.rules, game.engine, game.turn)].forEach(([event, handler]) => {
    game.engine.on(event, handler);
});
exports.registerEvents = registerEvents;
// The plugin loader imports each package for this side effect. Until it passes
// a game of its own, dropping it would produce one whose turn loop never
// starts — and, as with the rules, nothing saying so.
(0, exports.registerEvents)({
    engine: Engine_1.instance,
    rules: RuleRegistry_1.instance,
    turn: Turn_1.instance,
});
exports.default = exports.registerEvents;
//# sourceMappingURL=registerEvents.js.map