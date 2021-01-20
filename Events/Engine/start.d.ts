import { Engine } from '@civ-clone/core-engine/Engine';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
export declare const getEvents: (
  ruleRegistry?: RuleRegistry,
  engine?: Engine
) => [string, () => any][];
export default getEvents;
