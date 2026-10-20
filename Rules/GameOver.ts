import GameResult from '../GameResult';
import Rule from '@civ-clone/core-rule/Rule';

// What happens as a game ends, with its result: telling the players, for one.
export class GameOver extends Rule<[GameResult], void> {}

export default GameOver;
