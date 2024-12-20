import { Team, TeamSide } from "./team.model";

export type Winner = TeamSide | 'draw'

export type Game = {
    readonly id: number,
    playDate: Date,
    teams: Record<TeamSide, Team>
    scores: Record<TeamSide, number>,
    winner: Winner,
    perfectWin: boolean,
    creationDate: Date,
    updateDate: Date
}

export type Games = Array<Game>;