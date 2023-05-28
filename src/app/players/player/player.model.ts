import {Signal} from '@angular/core';

// ToDo CreationDate is missing from the Model.

export type Player = {
  readonly id: number,
  firstName: string,
  lastName: string,
  email?: string
}

export type PlayerStats = Player & {
  games: Signal<number>
}

export type Players = Player[]
export type PlayersStats = PlayerStats[]
