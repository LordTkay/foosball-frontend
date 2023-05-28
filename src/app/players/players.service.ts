import {computed, Injectable, signal} from '@angular/core';
import {Player, Players} from './player/player.model';
import {BehaviorSubject, tap} from 'rxjs';
import {GamesService} from '../games/games.service';
import {BackendService} from '../services/backend.service';

@Injectable({
    providedIn: 'root'
})
export class PlayersService {

    playersFetched = new BehaviorSubject<boolean>(false)
    private playersMap = signal<Map<Player['id'], Player>>(new Map());
    players = computed<Players>(() => Array.from(this.playersMap().values()));

    constructor(private gamesService: GamesService,
                private backendService: BackendService) {
        this.fetchPlayers()
    }

    public getPlayer(id: Player['id']) {
        return this.playersMap().get(id);
    }

    public addPlayer(player: Omit<Player, 'id' | 'playedGames' | 'creationDate' | 'updateDate'>) {
        return this.backendService.addPlayer(player)
            .pipe(tap(addedPlayer => {
                this.playersMap.mutate(playersMap => {
                    playersMap.set(addedPlayer.id, addedPlayer);
                });
            }));
    }

  public deletePlayer(id: Player['id']) {
    return this.backendService.deletePlayer(id)
      .pipe(
        tap(deletedId => {
          this.playersMap.mutate(playersMap => {
            playersMap.delete(deletedId);
          });
        })
      );
  }

    public editPlayer(player: Omit<Player, 'playedGames' | 'creationDate' | 'updateDate'>) {
        return this.backendService.editPlayer(player)
            .pipe(
                tap(updatedPlayer => {
                    this.playersMap.mutate(playersMap => playersMap.set(updatedPlayer.id, updatedPlayer));
                })
            );
    }

  public playerTrackBy(index: number, player: Player) {
    return player.id;
  }

  private fetchPlayers() {
    this.backendService.getPlayers()
        .subscribe(players => {
            this.playersMap.set(new Map(players.map(player => [player.id, player])));
            this.playersFetched.next(true);
        })
  }
}
