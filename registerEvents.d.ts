import { Engine } from '@civ-clone/core-engine/Engine';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { Turn } from './Turn';
/**
 * The slots this package needs from a game, declared structurally rather than
 * by importing `core-game`'s `Game`.
 *
 * `Game` imports `Turn` from here, so depending on it would make a package
 * cycle. A structural type has no such problem, and says more precisely what
 * this package actually touches. A real `Game` satisfies it.
 */
export declare type TurnBasedGame = {
  engine: Engine;
  rules: RuleRegistry;
  turn: Turn;
};
export declare const registerEvents: (game: TurnBasedGame) => void;
export default registerEvents;
