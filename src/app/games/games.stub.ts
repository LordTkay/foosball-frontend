import { Game } from "./game/game.model";
import { playersStub } from "../players/player/player.stub";

export const gamesStub = new Map<Game['id'], Game>([

  [0, {
    id: 0,
    playDate: new Date(2023, 4, 20, 12, 30, 25),
    teams: {
      yellow: { attacker: playersStub.get(0)!, defender: playersStub.get(1)! },
      black: { attacker: playersStub.get(2)!, defender: playersStub.get(3)! }
    },
    scores: { black: 0, yellow: 6 },
    winner: 'yellow'
  }],

  [1, {
    id: 1,
    playDate: new Date(2023, 4, 26, 13, 45, 30),
    teams: {
      yellow: { attacker: playersStub.get(2)!, defender: playersStub.get(1)! },
      black: { defender: playersStub.get(3)!, attacker: playersStub.get(0)! }
    },
    scores: { black: 4, yellow: 6 },
    winner: 'yellow'
  }],

  [2, {
    id: 2,
    playDate: new Date(2023, 4, 26, 15, 36, 15),
    teams: {
      yellow: { attacker: playersStub.get(2)!, defender: playersStub.get(1)! },
      black: { defender: playersStub.get(3)!, attacker: playersStub.get(0)! }
    },
    scores: { black: 10, yellow: 6 },
    winner: 'black'
  }],

])
