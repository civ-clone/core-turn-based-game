import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import { Turn, instance as turnInstance } from '../../Turn';
import End from '../../Rules/End';
import EngineStart from '@civ-clone/core-engine/Rules/Start';
import Start from '../../Rules/Start';

export const getEvents = (
  ruleRegistry: RuleRegistry = ruleRegistryInstance,
  engine: Engine = engineInstance,
  turn: Turn = turnInstance
): [string, () => any][] => [
  [
    'engine:start',
    (): void => {
      ruleRegistry.process(EngineStart);
    },
  ],
  ...['game:start', 'turn:end'].map((event: string): [string, () => any] => [
    event,
    (): void => {
      engine.emit('turn:start', turn.increment());
    },
  ]),
  [
    'turn:end',
    (): void => {
      ruleRegistry.process(End, turn);
    },
  ],
  [
    'turn:start',
    (): void => {
      ruleRegistry.process(Start, turn);
    },
  ],
];

export default getEvents;
