import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Rule from '@civ-clone/core-rule/Rule';
import Turn from '../Turn';
declare type EndArgs = [Turn];
export declare class End extends Rule<EndArgs, void> {}
export default End;
export interface IEndRegistry extends IRuleRegistry<End, EndArgs, void> {}
