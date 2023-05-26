import { Team, Teams } from "./team.model";

export type Game = {
  readonly id: number,
  playDate: Date,
  teams: Record<Teams, Team>
  scores: Record<Teams, number>,
  winner: Teams | 'draw'
}

export type Games = Game[]
