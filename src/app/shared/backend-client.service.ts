import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Player, Players } from "../players/model/player.model";
import { Game, Games, Winner } from "../games/model/game.model";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendClientService {

  private httpClient = inject(HttpClient)
  private url = environment.backendApi;

  getPlayers() {
    return this.httpClient.get<Players>(`${this.url}/players`);
  }

  addPlayer(player: Omit<Player, 'id' | 'playedGames' | 'creationDate' | 'updateDate'>) {
    return this.httpClient.put<Player>(`${this.url}/player`, player);
  }

  deletePlayer(id: Player['id']) {
    return this.httpClient.delete<Player['id']>(`${this.url}/player/${id}`);
  }

  editPlayer(player: Omit<Player, 'playedGames' | 'creationDate' | 'updateDate'>) {
    return this.httpClient.patch<Player>(`${this.url}/player/${player.id}`, player);
  }

  getGames() {
    return this.httpClient.get<Games>(`${this.url}/games`).pipe(
        map(this.mapGames)
    )
  }

  addGame(game: Omit<Game, 'id' | 'winner'>) {
    return this.httpClient.put<Game>(`${this.url}/game`, game).pipe(
        map(this.mapGames)
    )
  }

  private mapGames<T extends Games | Game>(games: T): T {
    const correctGames = Array.isArray(games) ? games : [games]

    correctGames.forEach(game => {
      game.playDate = new Date(game.playDate)
      game.updateDate = new Date(game.updateDate);
      game.creationDate = new Date(game.creationDate);
      game.winner = game.winner.toLowerCase() as Winner
    })

    return Array.isArray(games) ? correctGames : correctGames[0];
  }
}
