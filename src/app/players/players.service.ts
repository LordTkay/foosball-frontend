import {computed, Injectable, signal} from '@angular/core';
import {Player, PlayersStats, PlayerStats} from './player/player.model';
import {tap} from 'rxjs';
import {GamesService} from '../games/games.service';
import {BackendService} from '../services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private playersMap = signal<Map<Player['id'], PlayerStats>>(new Map());
  players = computed<PlayersStats>(() => Array.from(this.playersMap().values()));

  // ToDo The counting should be done in the backend. The Signals can be used to manually count the games, when new are added, some are
  //  modified or deleted.
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

  constructor(private gamesService: GamesService,
              private backendService: BackendService) {
  }

  public getPlayer(id: Player['id']) {
    return this.playersMap().get(id);
  }

  public addPlayer(player: Omit<Player, 'id'>) {
    return this.backendService.addPlayer(player)
      .pipe(tap(addedPlayer => {
        this.playersMap.mutate(playersMap => {
          const addedPlayerStat = {
            ...addedPlayer,
            games: computed(() => this.gamesPerPlayer().get(addedPlayer.id) ?? 0)
          };
          playersMap.set(addedPlayer.id, addedPlayerStat);
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

  public editPlayer(player: Player) {
    return this.backendService.editPlayer(player)
      .pipe(
        tap(updatedPlayer => {
          const updatedPlayerStat = {
            ...updatedPlayer,
            games: computed(() => this.gamesPerPlayer().get(player.id) ?? 0)
          };
          this.playersMap.mutate(playersMap => playersMap.set(updatedPlayer.id, updatedPlayerStat));
        })
      );
  }

  public playerTrackBy(index: number, player: Player) {
    return player.id;
  }

  fetchPlayers() {
    return this.backendService.getPlayers()
      .pipe(
        tap(players => {
          this.playersMap.set(new Map(players.map(player => {
            return [player.id, {
              ...player,
              games: computed(() => this.gamesPerPlayer().get(player.id) ?? 0)
            }];
          })));
        })
      );
  }
}
