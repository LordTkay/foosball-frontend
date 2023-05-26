import { computed, Injectable, signal } from '@angular/core';
import { Player, Players } from "./player/player.model";
import { environment } from "../../environments/environment";
import { delay, of, take, tap } from "rxjs";
import { playersStub } from "./player/player.stub";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private playersMap = signal<Map<Player['id'], Player>>(new Map())
  players = computed<Players>(() => Array.from(this.playersMap().values()))

  constructor() {
    this.fetchPlayers()
  }

  public getPlayer(id: Player['id']) {
    return this.playersMap().get(id);
  }

  public addPlayer(player: Omit<Player, 'id'>) {
    const id = (Array.from(this.playersMap().keys()).sort().at(-1) ?? 0) + 1

    return of({ ...player, id })
      .pipe(
        take(1),
        delay(2000),
        tap(addedPlayer => {
          this.playersMap.mutate(playersMap => playersMap.set(addedPlayer.id, addedPlayer));
        })
      )
  }

  public deletePlayer(id: Player['id']) {
    return of(id)
      .pipe(
        take(1),
        delay(2000),
        tap(deletedId => {
          this.playersMap.mutate(playersMap => {
            playersMap.delete(deletedId)
          })
        })
      )
  }

  public editPlayer(player: Player) {
    return of(player)
      .pipe(
        take(1),
        delay(2000),
        tap(updatedPlayer => {
          this.playersMap.mutate(playersMap => playersMap.set(updatedPlayer.id, updatedPlayer));
        })
      )
  }

  public playerTrackBy(index: number, player: Player) {
    return player.id;
  }

  private fetchPlayers() {
    if (environment.production) {
      //ToDo Fetch Players from Backend
    } else {
      this.playersMap.set(playersStub)
    }
  }
}
