import {computed, Injectable, signal} from '@angular/core';
import {Game, Games} from './game/game.model';
import {delay, of, take, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private gamesMap = signal<Map<Game['id'], Game>>(new Map())
  games = computed<Games>(() => Array.from(this.gamesMap().values()));

  constructor() {
  }

  public getGame(id: Game['id']) {
    return this.gamesMap().get(id);
  }

  public addGame(game: Omit<Game, 'id'>) {
    const id = (Array.from(this.gamesMap().keys()).sort((a, b) => a - b).at(-1) ?? 0) + 1;

    return of({...game, id})
      .pipe(
        take(1),
        delay(2000),
        tap(addedGame => {
          this.gamesMap.mutate(gamesMap => gamesMap.set(addedGame.id, addedGame));
        })
      )
  }

  public deleteGame(id: Game['id']) {
    return of(id)
      .pipe(
        take(1),
        delay(2000),
        tap(deletedId => {
          this.gamesMap.mutate(gamesMap => {
            gamesMap.delete(deletedId)
          })
        })
      )
  }

  public editGame(game: Game) {
    return of(game)
      .pipe(
        take(1),
        delay(2000),
        tap(updatedGame => {
          this.gamesMap.mutate(gamesMap => gamesMap.set(updatedGame.id, updatedGame));
        })
      )
  }

  public gameTrackBy(index: number, game: Game) {
    return game.id
  }

  fetchGames() {
    //ToDo Fetch Games from Backend
    this.gamesMap.set(new Map())
    return of([] as Games)
  }
}
