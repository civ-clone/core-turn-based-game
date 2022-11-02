export interface ITurn {
  increment(): number;
  value(): number;
}
export declare class Turn implements ITurn {
  #private;
  increment(): number;
  value(): number;
}
export declare const instance: Turn;
export default Turn;
