export interface Player {
  id: number,
  firstName: string,
  lastName: string,
  email?: string
}

export type Players = Player[]
