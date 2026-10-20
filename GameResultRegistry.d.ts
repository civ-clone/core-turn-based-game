import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import GameResult from './GameResult';
export interface IGameResultRegistry extends IEntityRegistry<GameResult> {
  get(): GameResult | null;
  pending(): boolean;
}
/**
 * Holds the game's `GameResult`: none while the game is being played, and one once it has ended. A registry rather
 * than a field so that it's saved like every other piece of runtime state, and a game (or a save made before this
 * existed) with none has not ended.
 */
export declare class GameResultRegistry
  extends EntityRegistry<GameResult>
  implements IGameResultRegistry
{
  constructor();
  get(): GameResult | null;
  pending(): boolean;
  register(...entities: GameResult[]): void;
}
export declare const instance: GameResultRegistry;
export default GameResultRegistry;
