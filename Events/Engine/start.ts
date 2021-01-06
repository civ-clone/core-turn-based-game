import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import { instance as turn } from '../../Turn';

export const getEvents = (
  engine: Engine = engineInstance
): [string, () => any][] => [
  ...['game:start', 'turn:end'].map((event: string): [string, () => any] => [
    event,
    (): boolean => engine.emit('turn:start', turn.increment()),
  ]),
];

export default getEvents;
