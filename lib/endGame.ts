import GameOver from '../Rules/GameOver';
import GameResult from '../GameResult';
import GameResultRegistry from '../GameResultRegistry';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Turn from '../Turn';

/**
 * End the game, for `reason`, with `winner` (or none). A game ends once: when it already has a result this does
 * nothing and returns `null`, so a ruleset's endings can each be checked every turn, and none fires again after the
 * players keep playing.
 */
export const endGame = (
  reason: string,
  winner: Player | null,
  gameResultRegistry: GameResultRegistry,
  ruleRegistry: RuleRegistry,
  turn: Turn
): GameResult | null => {
  if (gameResultRegistry.get() !== null) {
    return null;
  }

  const gameResult = new GameResult(reason, winner, turn.value());

  gameResultRegistry.register(gameResult);

  ruleRegistry.process(GameOver, gameResult);

  return gameResult;
};

export default endGame;
