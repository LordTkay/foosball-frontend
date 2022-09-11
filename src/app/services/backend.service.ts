import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Game, Games } from "../models/game.model";
import { map, of } from "rxjs";
import { Player, Players } from "../models/player.model";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private readonly backendUrl = '/api'

  constructor(private httpClient: HttpClient) {
  }

  getGames() {
    return this.httpClient.get<Games>(`${ this.backendUrl }/games`)
      .pipe(
        map(games => {
          return games.map(game => {
            game.playDateTime = new Date(game.playDateTime)
            return game;
          })
        })
      );
  }

  getPlayers() {
    return this.httpClient.get<Players>(`${ this.backendUrl }/players`)
      .pipe(
        map(players => {
          return players.map(player => {
            player.creationDate = new Date(player.creationDate)
            return player;
          })
        })
      );
  }

  getPlayer(id: number) {
    return this.httpClient.get<Player>(`${ this.backendUrl }/player/${ id }`)
      .pipe(
        map(player => {
          player.creationDate = new Date(player.creationDate)
          return player
        })
      )
  }

  createGame(game: Omit<Game, 'id' | 'playDateTime'>) {
    return this.httpClient.post(`${ this.backendUrl }/game`, game)
  }
}
