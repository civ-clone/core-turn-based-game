import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
export interface ITurn extends IDataObject {
  increment(): number;
  set(value: number): void;
  value(): number;
}
export declare class Turn extends DataObject implements ITurn {
  private _value;
  constructor();
  increment(): number;
  /**
   * Put the turn back to where a saved game left it.
   *
   * A save records the turn in its metadata and the `Turn` itself is reachable
   * from no entity, so loading had no way to restore it: a game loaded in a
   * fresh process — a reloaded browser tab, which is exactly how the renderer
   * loads one — resumed at turn 0 with a turn-40 world. In the same process it
   * looked correct only because the loaded game adopted the very `Turn` object
   * the saved one had been counting.
   *
   * The year needs nothing of its own: `Year.value()` is a function of the
   * turn.
   */
  set(value: number): void;
  value(): number;
}
export declare const instance: Turn;
export default Turn;
