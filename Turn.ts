import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';

export interface ITurn extends IDataObject {
  increment(): number;
  value(): number;
}

export class Turn extends DataObject implements ITurn {
  #value: number = 0;

  constructor() {
    super();

    this.addKey('value');
  }

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
