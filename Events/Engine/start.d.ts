import { Engine } from '@civ-clone/core-engine/Engine';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { Turn } from '../../Turn';
export declare const getEvents: (
  ruleRegistry?: RuleRegistry,
  engine?: Engine,
  turn?: Turn
) => [string, () => any][];
export default getEvents;
