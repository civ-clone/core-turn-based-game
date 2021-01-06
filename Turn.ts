import { Yield, IYield } from '@civ-clone/core-yield/Yield';

export interface ITurn extends IYield {
  increment(): number;
}

export class Turn extends Yield implements ITurn {
  add(): void {}

  addModifier(): void {}

  increment(): number {
    super.add(1);

    return this.value();
  }

  set(): void {}

  subtract(): void {}
}

export const instance: Turn = new Turn();

export default Turn;
