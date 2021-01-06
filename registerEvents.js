"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Engine_1 = require("@civ-clone/core-engine/Engine");
const start_1 = require("./Events/Engine/start");
[...start_1.default(Engine_1.instance)].forEach(([event, handler]) => Engine_1.instance.on(event, handler));
//# sourceMappingURL=registerEvents.js.map