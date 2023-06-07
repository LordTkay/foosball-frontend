import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player, Players } from '../players/player/player.model';
import { Game, Games, Winner } from "../games/game/game.model";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private httpClient: HttpClient) {
    }

    getPlayers() {
        return this.httpClient.get<Players>('localhost:8080/api/players');
    }

    addPlayer(player: Omit<Player, 'id' | 'playedGames' | 'creationDate' | 'updateDate'>) {
        return this.httpClient.put<Player>('localhost:8080/api/player', player);
    }

    deletePlayer(id: Player['id']) {
        return this.httpClient.delete<Player['id']>(`localhost:8080/api/player/${id}`);
    }

    editPlayer(player: Omit<Player, 'playedGames' | 'creationDate' | 'updateDate'>) {
        return this.httpClient.patch<Player>(`localhost:8080/api/player/${player.id}`, player);
    }

    getGames() {
        return this.httpClient.get<Games>('localhost:8080/api/games').pipe(
            map(this.correctGames)
        )
    }

    addGame(game: Omit<Game, 'id' | 'winner'>) {
        return this.httpClient.put<Game>('localhost:8080/api/game', game).pipe(
            map(this.correctGames)
        )
    }

    private correctGames<T extends Games | Game>(games: T): T {
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
