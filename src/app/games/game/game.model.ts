import { Team } from "./team.model";

export type Game = {
  readonly id: number,
  playDate: Date,
  yellowTeam: Team,
  blackTeam: Team,
  scores: {
    yellow: number,
    black: number
  },
  winner: 'yellow' | 'black' | 'draw'
}

export type Games = Game[]
