import { instance as engine } from '@civ-clone/core-engine/Engine';
import engineStart from './Events/Engine/start';

[...engineStart()].forEach(([event, handler]: [string, () => any]): void => {
  engine.on(event, handler);
});
