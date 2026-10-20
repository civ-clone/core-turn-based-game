import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import Player from '@civ-clone/core-player/Player';
export interface IGameResult extends IDataObject {
  completeScoring(): void;
  reason(): string;
  scoringComplete(): boolean;
  turn(): number;
  winner(): Player | null;
}
/**
 * How a game ended: why, who won (if anyone did), and on which turn. An entity so that it's saved with the game.
 *
 * The reason is a stable name a ruleset chooses, such as `conquest` or `retired`, for a renderer to describe it by.
 * Once the players have chosen to keep playing, the scoring is complete: the result stays, and nothing is scored again.
 */
export declare class GameResult extends DataObject implements IGameResult {
  private _reason;
  private _scoringComplete;
  private _turn;
  private _winner;
  constructor(reason: string, winner: Player | null, turn: number);
  completeScoring(): void;
  reason(): string;
  scoringComplete(): boolean;
  turn(): number;
  winner(): Player | null;
}
export default GameResult;
