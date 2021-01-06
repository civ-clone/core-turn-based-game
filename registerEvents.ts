import { instance as engine } from '@civ-clone/core-engine/Engine';
import engineStart from './Events/Engine/start';

[...engineStart(engine)].forEach(([event, handler]: [string, () => any]): any =>
  engine.on(event, handler)
);
