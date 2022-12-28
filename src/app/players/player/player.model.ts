export interface Player {
  id: number,
  firstName: string,
  lastName: string,
  email?: string
}

export type PlayerEditable = Player & { edit?: boolean };

export type Players = Player[]
export type PlayersEditable = PlayerEditable[]
