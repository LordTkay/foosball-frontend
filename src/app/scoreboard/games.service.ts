import { computed, Injectable, signal } from '@angular/core';
import { Game, Games } from "./game/game.model";
import { environment } from "../../environments/environment";
import { gamesStub } from "./games.stub";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private gamesMap = signal<Map<Game['id'], Game>>(new Map())
  games = computed<Games>(() => Array.from(this.gamesMap().values()));

  constructor() {
    this.fetchGames()
  }

  private fetchGames() {
    if (environment.production) {
      //ToDo Fetch Games from Backend
    } else {
      this.gamesMap.set(gamesStub)
    }
  }
}
