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
export class GameResult extends DataObject implements IGameResult {
  private _reason: string;
  private _scoringComplete: boolean = false;
  private _turn: number;
  private _winner: Player | null;

  constructor(reason: string, winner: Player | null, turn: number) {
    super();

    this._reason = reason;
    this._winner = winner;
    this._turn = turn;

    this.addKey('reason', 'scoringComplete', 'turn', 'winner');
  }

  completeScoring(): void {
    this._scoringComplete = true;
  }

  reason(): string {
    return this._reason;
  }

  scoringComplete(): boolean {
    return this._scoringComplete;
  }

  turn(): number {
    return this._turn;
  }

  winner(): Player | null {
    return this._winner;
  }
}

export default GameResult;
