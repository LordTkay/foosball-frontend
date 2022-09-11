export interface Player {
  id: number,
  firstName: string,
  lastName: string,
  email?: string,
  creationDate: Date
}

export type Players = Player[]
