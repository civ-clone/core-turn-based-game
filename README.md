# core-turn-based-game

This repo stores the core concept of a `Turn` and some basic `Rule`s and events around the `Start` and `End` of the 
turn. This is the basis for a turn-based game. Packages like `civ1-player` utilise these to allow a `Player` to perform
their actions, before ending the `Player`'s turn and then the game turn.

## Ending a game

`endGame(reason, winner, gameResults, rules, turn)` ends the game once: it records a `GameResult` (the reason, the
winner if there is one, and the turn) in the `GameResultRegistry` and processes the `GameOver` rules with it. A ruleset
decides what ends a game, typically in `End` rules, which run after every player has finished the turn and before the
next one starts.

While a game has ended and its scoring isn't complete, the turn loop waits at the end of the turn. Calling
`completeScoring()` on the result and emitting `game:continue` starts the next turn, and nothing is scored again. A game
loaded where it was waiting emits `turn:wait` to wait again.
