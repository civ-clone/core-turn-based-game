import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Rule from '@civ-clone/core-rule/Rule';
import Turn from '../Turn';

type StartArgs = [Turn];

export class Start extends Rule<StartArgs, void> {}

export default Start;

export interface IStartRegistry extends IRuleRegistry<Start, StartArgs, void> {}
