import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import { Turn, instance as turnInstance } from './Turn';
import engineStart from './Events/Engine/start';

/**
 * The slots this package needs from a game, declared structurally rather than
 * by importing `core-game`'s `Game`.
 *
 * `Game` imports `Turn` from here, so depending on it would make a package
 * cycle. A structural type has no such problem, and says more precisely what
 * this package actually touches. A real `Game` satisfies it.
 */
export type TurnBasedGame = {
  engine: Engine;
  rules: RuleRegistry;
  turn: Turn;
};

export const registerEvents = (game: TurnBasedGame): void =>
  [...engineStart(game.rules, game.engine, game.turn)].forEach(
    ([event, handler]: [string, () => any]): void => {
      game.engine.on(event, handler);
    }
  );

// The plugin loader imports each package for this side effect. Until it passes
// a game of its own, dropping it would produce one whose turn loop never
// starts — and, as with the rules, nothing saying so.
registerEvents({
  engine: engineInstance,
  rules: ruleRegistryInstance,
  turn: turnInstance,
});

export default registerEvents;
