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
export class GameResultRegistry
  extends EntityRegistry<GameResult>
  implements IGameResultRegistry
{
  constructor() {
    super(GameResult);
  }

  get(): GameResult | null {
    const [gameResult] = this.entries();

    return gameResult ?? null;
  }

  // The game has ended and the players haven't yet chosen to keep playing, so the next turn waits.
  pending(): boolean {
    const gameResult = this.get();

    return gameResult !== null && !gameResult.scoringComplete();
  }

  register(...entities: GameResult[]): void {
    if (this.length + entities.length > 1) {
      throw new TypeError('A game has one GameResult.');
    }

    super.register(...entities);
  }
}

export const instance: GameResultRegistry = new GameResultRegistry();

export default GameResultRegistry;
