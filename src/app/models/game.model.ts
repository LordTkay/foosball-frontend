import { Timestamp } from "rxjs";

export interface Game {
  id: number,
  playDateTime: Date,
  blackAttackPlayerId: number,
  blackDefensePlayerId: number,
  yellowAttackPlayerId: number,
  yellowDefensePlayerId: number,
  blackWon: boolean
}

export type Games = Game[]
