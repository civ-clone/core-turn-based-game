import Effect from '@civ-clone/core-rule/Effect';
import End from '../Rules/End';
import Engine from '@civ-clone/core-engine/Engine';
import GameOver from '../Rules/GameOver';
import GameResult from '../GameResult';
import GameResultRegistry from '../GameResultRegistry';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Start from '../Rules/Start';
import Turn from '../Turn';
import endGame from '../lib/endGame';
import { expect } from 'chai';
import registerEvents from '../registerEvents';

// A game of its own, with its turn loop's events, and the turns that started.
const setUp = () => {
  const engine = new Engine(),
    gameResult = new GameResultRegistry(),
    rules = new RuleRegistry(),
    turn = new Turn(),
    started: number[] = [];

  registerEvents({ engine, gameResult, rules, turn });

  rules.register(
    new Start(new Effect((turn: Turn) => started.push(turn.value())))
  );

  return { engine, gameResult, rules, turn, started };
};

describe('the turn loop', (): void => {
  it('runs the End rules before the next turn starts', (): void => {
    const { engine, rules, started } = setUp(),
      ended: [number, number[]][] = [];

    rules.register(
      new End(
        new Effect((turn: Turn) => ended.push([turn.value(), [...started]]))
      )
    );

    engine.emit('game:start');
    engine.emit('turn:end');

    expect(ended).to.deep.equal([[1, [1]]]);
    expect(started).to.deep.equal([1, 2]);
  });

  it('waits after a turn that ended the game, until the players keep playing', (): void => {
    const { engine, gameResult, rules, turn, started } = setUp();

    rules.register(
      new End(
        new Effect((turn: Turn) =>
          endGame('date', null, gameResult, rules, turn)
        )
      )
    );

    engine.emit('game:start');
    engine.emit('turn:end');

    expect(started).to.deep.equal([1]);
    expect(turn.value()).to.equal(1);

    // Asked to continue before the players have chosen to, it still waits.
    engine.emit('game:continue');

    expect(started).to.deep.equal([1]);

    gameResult.get()!.completeScoring();
    engine.emit('game:continue');

    expect(started).to.deep.equal([1, 2]);

    // The game has ended once: later turns go on.
    engine.emit('turn:end');

    expect(started).to.deep.equal([1, 2, 3]);
    expect(gameResult.length).to.equal(1);
  });

  it('carries on with the turn when a game that ended part-way through it continues', (): void => {
    const { engine, gameResult, rules, turn, started } = setUp();

    engine.emit('game:start');

    endGame('retired', null, gameResult, rules, turn);
    gameResult.get()!.completeScoring();
    engine.emit('game:continue');

    expect(started).to.deep.equal([1]);

    engine.emit('turn:end');

    expect(started).to.deep.equal([1, 2]);
  });

  it('does not carry waiting over into a new game', (): void => {
    const { engine, gameResult, rules, turn, started } = setUp();

    rules.register(
      new End(
        new Effect((turn: Turn) =>
          endGame('date', null, gameResult, rules, turn)
        )
      )
    );

    engine.emit('game:start');
    engine.emit('turn:end');

    expect(started).to.deep.equal([1]);

    // A new game in the same process: one that ends part-way through a turn and continues starts nothing.
    gameResult.unregister(...gameResult.entries());
    turn.set(0);
    engine.emit('game:start');

    expect(started).to.deep.equal([1, 1]);

    endGame('retired', null, gameResult, rules, turn);
    gameResult.get()!.completeScoring();
    engine.emit('game:continue');

    expect(started).to.deep.equal([1, 1]);
  });

  it('waits again when a game loaded where it was waiting is told to', (): void => {
    const { engine, gameResult, rules, turn, started } = setUp();

    turn.set(40);
    gameResult.register(new GameResult('date', null, 40));

    engine.emit('turn:wait');
    gameResult.get()!.completeScoring();
    engine.emit('game:continue');

    expect(started).to.deep.equal([41]);
  });
});

describe('GameResultRegistry', (): void => {
  it('holds one result, and takes the one it holds again', (): void => {
    const registry = new GameResultRegistry(),
      result = new GameResult('date', null, 1);

    registry.register(result);
    registry.register(result);

    expect(registry.length).to.equal(1);
    expect(() =>
      registry.register(new GameResult('retired', null, 2))
    ).to.throw(TypeError);
  });
});

describe('endGame', (): void => {
  it('records the result once, and processes GameOver with it', (): void => {
    const { gameResult, rules, turn } = setUp(),
      winner = new Player(rules),
      over: GameResult[] = [];

    rules.register(
      new GameOver(new Effect((result: GameResult) => over.push(result)))
    );

    turn.set(12);

    const result = endGame('conquest', winner, gameResult, rules, turn);

    expect(result).to.not.equal(null);
    expect(result!.reason()).to.equal('conquest');
    expect(result!.winner()).to.equal(winner);
    expect(result!.turn()).to.equal(12);
    expect(result!.scoringComplete()).to.equal(false);
    expect(over).to.deep.equal([result]);
    expect(gameResult.pending()).to.equal(true);

    expect(endGame('date', null, gameResult, rules, turn)).to.equal(null);
    expect(over.length).to.equal(1);
    expect(gameResult.get()).to.equal(result);
  });

  it('has nothing pending before the game ends, or once scoring is complete', (): void => {
    const { gameResult, rules, turn } = setUp();

    expect(gameResult.get()).to.equal(null);
    expect(gameResult.pending()).to.equal(false);

    endGame('retired', null, gameResult, rules, turn);
    gameResult.get()!.completeScoring();

    expect(gameResult.pending()).to.equal(false);
  });
});
