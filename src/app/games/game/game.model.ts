import {Team, Teams} from "./team.model";

export type Winner = Teams | 'draw'

export type Game = {
    readonly id: number,
    playDate: Date,
    teams: Record<Teams, Team>
    scores: Record<Teams, number>,
    winner: Winner,
    perfectWin: boolean,
    creationDate: Date,
    updateDate: Date
}

export type Games = Game[]
