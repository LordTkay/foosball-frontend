import { computed, Injectable, signal } from '@angular/core';
import { Player, PlayersStats, PlayerStats } from './player/player.model';
import { environment } from '../../environments/environment';
import { delay, of, take, tap } from 'rxjs';
import { playersStub } from './player/player.stub';
import { GamesService } from '../games/games.service';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private playersMap = signal<Map<Player['id'], PlayerStats>>(new Map());
  players = computed<PlayersStats>(() => Array.from(this.playersMap().values()));

  private gamesPerPlayer = computed(() => {
    const gamesPerPlayer = new Map<Player['id'], number>();
    this.gamesService.games().forEach(game => {
      // To check if the player was already counted for this match, for example when the player is in both positions
      const playerCountedGame = new Set<Player['id']>();

      Object.values(game.teams).forEach(team => {
        Object.values(team).forEach(playerId => {
          if (playerCountedGame.has(playerId)) return;

          const gamesOfPlayer = gamesPerPlayer.get(playerId);
          gamesPerPlayer.set(playerId, (gamesOfPlayer ?? 0) + 1);
          playerCountedGame.add(playerId);
        });
      });
    });
    return gamesPerPlayer;
  });

  constructor(private gamesService: GamesService) {
    this.fetchPlayers();
  }

  public getPlayer(id: Player['id']) {
    return this.playersMap().get(id);
  }

  public addPlayer(player: Omit<Player, 'id'>) {
    const id = (Array.from(this.playersMap().keys()).sort((a, b) => a - b).at(-1) ?? 0) + 1;

    return of({ ...player, id })
      .pipe(
        take(1),
        delay(2000),
        tap(addedPlayer => {
          const addedPlayerStats = { ...addedPlayer, games: computed(() => this.gamesPerPlayer().get(addedPlayer.id) ?? 0) };
          this.playersMap.mutate(playersMap => playersMap.set(addedPlayer.id, addedPlayerStats));
        })
      );
  }

  public deletePlayer(id: Player['id']) {
    return of(id)
      .pipe(
        take(1),
        delay(2000),
        tap(deletedId => {
          this.playersMap.mutate(playersMap => {
            playersMap.delete(deletedId);
          });
        })
      );
  }

  public editPlayer(player: Player) {
    return of(player)
      .pipe(
        take(1),
        delay(2000),
        tap(updatedPlayer => {
          const updatedPlayerStat = { ...updatedPlayer, games: computed(() => this.gamesPerPlayer().get(player.id) ?? 0) };
          this.playersMap.mutate(playersMap => playersMap.set(updatedPlayer.id, updatedPlayerStat));
        })
      );
  }

  public playerTrackBy(index: number, player: Player) {
    return player.id;
  }

  private fetchPlayers() {
    if (environment.production) {
      //ToDo Fetch Players from Backend
    } else {
      this.playersMap.set(new Map(Array.from(playersStub.values()).map(player => [player.id, {
        ...player,
        games: computed(() => this.gamesPerPlayer().get(player.id) ?? 0)
      }])));
    }
  }
}
