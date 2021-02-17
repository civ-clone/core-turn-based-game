import { End, IEndRegistry } from '../../Rules/End';
import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import {
  Start as EngineStart,
  IStartRegistry as IEngineStartRegistry,
} from '@civ-clone/core-engine/Rules/Start';
import { Start, IStartRegistry } from '../../Rules/Start';
import { instance as turn } from '../../Turn';

export const getEvents = (
  ruleRegistry: RuleRegistry = ruleRegistryInstance,
  engine: Engine = engineInstance
): [string, () => any][] => [
  [
    'engine:start',
    (): void => {
      (ruleRegistry as IEngineStartRegistry).process(EngineStart);
    },
  ],
  ...['game:start', 'turn:end'].map((event: string): [string, () => any] => [
    event,
    (): boolean => engine.emit('turn:start', turn.increment()),
  ]),
  [
    'turn:end',
    (): void => {
      (ruleRegistry as IEndRegistry).process(End, turn);
    },
  ],
  [
    'turn:start',
    (): void => {
      (ruleRegistry as IStartRegistry).process(Start, turn);
    },
  ],
];

export default getEvents;
