import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
export interface ITurn extends IDataObject {
  increment(): number;
  value(): number;
}
export declare class Turn extends DataObject implements ITurn {
  #private;
  constructor();
  increment(): number;
  value(): number;
}
export declare const instance: Turn;
export default Turn;
