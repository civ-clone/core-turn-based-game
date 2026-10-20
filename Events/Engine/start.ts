import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import {
  GameResultRegistry,
  instance as gameResultRegistryInstance,
} from '../../GameResultRegistry';
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
  turn: Turn = turnInstance,
  gameResultRegistry: GameResultRegistry = gameResultRegistryInstance
): [string, () => any][] => {
  // Whether the turn loop has stopped between turns for a game that has ended, until the players keep playing.
  let waiting = false;

  const nextTurn = (): void => {
    engine.emit('turn:start', turn.increment());
  };

  return [
    [
      'engine:start',
      (): void => {
        ruleRegistry.process(EngineStart);
      },
    ],
    ['game:start', nextTurn],
    [
      'turn:end',
      (): void => {
        // The turn's `End` rules run before the next turn starts, so they see the turn every player has just finished.
        //  A game they end waits there: nothing moves behind the ending until the players choose to keep playing.
        ruleRegistry.process(End, turn);

        if (gameResultRegistry.pending()) {
          waiting = true;

          return;
        }

        nextTurn();
      },
    ],
    [
      'turn:start',
      (): void => {
        ruleRegistry.process(Start, turn);
      },
    ],
    // A game loaded where it was waiting, between turns, waits again.
    [
      'turn:wait',
      (): void => {
        waiting = true;
      },
    ],
    // The players keep playing: the next turn starts if the loop was waiting for it. A game that ended part-way through
    //  a turn (the players retired, say) carries on with that turn instead, so there is nothing to start.
    [
      'game:continue',
      (): void => {
        if (!waiting || gameResultRegistry.pending()) {
          return;
        }

        waiting = false;

        nextTurn();
      },
    ],
  ];
};

export default getEvents;
