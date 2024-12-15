export type Player = {
    readonly id: number,
    firstName: string,
    lastName: string,
    email?: string,
    creationDate: Date,
    updateDate: Date,
    playedGames: number
}

export type Players = Player[]
