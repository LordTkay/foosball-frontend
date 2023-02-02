import { Injectable } from '@angular/core';
import { Player, Players } from "./player/player.model";
import { BehaviorSubject, delay, of, take, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PlayersService {
    playersChange$ = new BehaviorSubject<Player[]>([]);
    private playersStub: Players = [
        { id: 0, firstName: 'Tobias', lastName: 'Wagner', email: 'Tobias.Wagner@MetallRente-Services.de' },
        { id: 1, firstName: 'Gareth', lastName: 'Schmutz' },
        { id: 2, firstName: 'Sven', lastName: 'Hanl' }
    ];
    private players: Map<Player['id'], Player> = new Map([]);

    constructor() {
        this.fetchPlayers();
    }

    public editPlayer(id: Player['id'], player: Player) {
        return of(player)
            .pipe(
                take(1),
                delay(2000),
                tap(updatedPlayer => {
                    this.players.set(updatedPlayer.id, updatedPlayer)
                    this.updatePlayers();
                })
            )

    }

    public playerTrackBy(index: number, player: Player) {
        return player.id;
    }

    public getPlayer(id: Player['id']) {
        return this.players.get(id);
    }

    public deletePlayer(id: Player['id']) {
        return of(id)
            .pipe(
                take(1),
                delay(2000),
                tap(deletedId => {
                    this.players.delete(deletedId);
                    this.updatePlayers();
                })
            )
    }

    public addPlayer(player: Omit<Player, 'id'>) {
        const id = (Array.from(this.players.keys()).sort().at(-1) ?? 0) + 1

        return of({ ...player, id })
            .pipe(
                take(1),
                delay(2000),
                tap(addedPlayer => {
                    this.players.set(addedPlayer.id, addedPlayer);
                    this.updatePlayers();
                })
            )
    }

    private fetchPlayers() {
        this.playersStub.forEach(player => this.players.set(player.id, player))
        this.updatePlayers();
    }

    private updatePlayers() {
        this.playersChange$.next([...this.players.values()]);
    }
}
