import { computed, inject, Injectable, signal } from '@angular/core';
import { Player, Players } from "./model/player.model";
import { BackendClientService } from "../shared/backend-client.service";
import { tap } from "rxjs";

type State = {
    playersMap: Map<Player['id'], Player>
}

@Injectable({
    providedIn: 'root'
})
export class PlayersService {
    private backendClient = inject(BackendClientService)

    private state = signal<State>({
        playersMap: new Map()
    })

    players = computed<Players>(() => Array.from(this.state().playersMap.values()));

    get(id: Player['id']) {
        // ToDo, if ID not in the current map, check if it's in the backend
        return this.state().playersMap.get(id);
    }

    add(player: Omit<Player, 'id' | 'playedGames' | 'creationDate' | 'updateDate'>) {
        return this.backendClient.addPlayer(player).pipe(
            tap(addedPlayer => {
                this.state.update(state => ({
                    ...state,
                    playersMap: state.playersMap.set(addedPlayer.id, addedPlayer)
                }))
            })
        )
    }

    fetchPlayers() {
        return this.backendClient.getPlayers().pipe(
            tap(players => {
                this.state.update(state => ({
                    ...state,
                    playersMap: new Map(players.map(player => [player.id, player]))
                }))
            })
        )
    }
}
