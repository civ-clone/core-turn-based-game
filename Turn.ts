export interface ITurn {
  increment(): number;
  value(): number;
}

export class Turn implements ITurn {
  #value: number = 0;

  increment(): number {
    this.#value++;

    return this.#value;
  }

  value(): number {
    return this.#value;
  }
}

export const instance: Turn = new Turn();

export default Turn;
