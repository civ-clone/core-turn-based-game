import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import { Start, IStartRegistry } from '@civ-clone/core-engine/Rules/Start';
import { instance as turn } from '../../Turn';

export const getEvents = (
  ruleRegistry: RuleRegistry = ruleRegistryInstance,
  engine: Engine = engineInstance
): [string, () => any][] => [
  ...['game:start', 'turn:end'].map((event: string): [string, () => any] => [
    event,
    (): boolean => engine.emit('turn:start', turn.increment()),
  ]),
  [
    'engine:start',
    (): void => {
      (ruleRegistry as IStartRegistry).process(Start);
    },
  ],
];

export default getEvents;
