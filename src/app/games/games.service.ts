import { computed, inject, Injectable, signal } from '@angular/core';
import { BackendClientService } from "../shared/backend-client.service";
import { Game, Games } from "./model/game.model";
import { tap } from "rxjs";

type State = {
    gamesMap: Map<Game['id'], Game>
}

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    private backendClient = inject(BackendClientService)

    private state = signal<State>({
        gamesMap: new Map()
    })

    games = computed<Games>(() => Array.from(this.state().gamesMap.values()));

    get(id: Game['id']) {
        // ToDo, if ID not in the current map, check if it's in the backend
        return this.state().gamesMap.get(id);
    }

    add(game: Omit<Game, 'id' | 'winner'>) {
        return this.backendClient.addGame(game).pipe(
            tap(addedGame => {
                this.state.update(state => ({
                    ...state,
                    gamesMap: state.gamesMap.set(addedGame.id, addedGame)
                }))
            })
        )
    }

    fetchGames() {
        return this.backendClient.getGames().pipe(
            tap(games => {
                this.state.update(state => ({
                    ...state,
                    gamesMap: new Map(games.map(game => [game.id, game]))
                }))
            })
        )
    }
}
