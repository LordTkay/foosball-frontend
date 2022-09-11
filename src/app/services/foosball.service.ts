import { Injectable } from '@angular/core';
import { Game, Games } from "../models/game.model";
import { Player, Players } from "../models/player.model";
import { BackendService } from "./backend.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FoosballService {

  private games: Games = [
    {
      id: 0,
      playDateTime: new Date(),
      blackAttackPlayerId: 0,
      blackDefensePlayerId: 1,
      yellowAttackPlayerId: 2,
      yellowDefensePlayerId: 3,
      blackWon: true
    }
  ];
  private players: Players = [
    {
      id: 0,
      firstName: 'Tobias',
      lastName: 'Wagner',
      email: 'Tobias.Wagner@MetallRente-Services.de',
      creationDate: new Date()
    },
    {
      id: 1,
      firstName: 'Sven',
      lastName: 'Hansl',
      creationDate: new Date()
    },
    {
      id: 2,
      firstName: 'Garry',
      lastName: 'Schmutz',
      creationDate: new Date()
    },
    {
      id: 3,
      firstName: 'Robert',
      lastName: 'Kansy',
      creationDate: new Date()
    },
  ]
  gamesChange$ = new BehaviorSubject<Games>(this.games)
  playersChange$ = new BehaviorSubject<Players>(this.players)

  constructor(private backendService: BackendService) {
  }

  getGames() {
    return this.games.slice()
  }

  getPlayers() {
    return this.players.slice();
  }

  getPlayer(id: number) {
    return this.players.find(player => player.id === id)
  }

  getGame(id: number) {
    return this.games.find(game => game.id === id);
  }

  createGame(game: Omit<Game, 'id' | 'playDateTime'>) {
    const newGame: Game = {
      ...game,
      id: this.games.length,
      playDateTime: new Date()
    }
    this.games.push(newGame);
    this.gamesChange$.next([...this.games])
    return newGame;
  }
}
