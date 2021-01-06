import { Yield, IYield } from '@civ-clone/core-yield/Yield';
export interface ITurn extends IYield {
  increment(): number;
}
export declare class Turn extends Yield implements ITurn {
  add(): void;
  addModifier(): void;
  increment(): number;
  set(): void;
  subtract(): void;
}
export declare const instance: Turn;
export default Turn;
