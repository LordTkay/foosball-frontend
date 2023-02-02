import { Injectable } from '@angular/core';
import { Player, Players } from "./player/player.model";
import { BehaviorSubject } from "rxjs";

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
        this.setPlayers();
    }

    public editPlayer(id: Player['id'], player: Player) {
        this.players.set(id, player)
        this.updatePlayers();
    }

    public playerTrackBy(index: number, player: Player) {
        return player.id;
    }

    public getPlayer(id: Player['id']) {
        return this.players.get(id);
    }

    public deletePlayer(id: Player['id']) {
        this.players.delete(id);
        this.updatePlayers();
    }

    public addPlayer(player: Omit<Player, 'id'>) {
        const id = (Array.from(this.players.keys()).sort().at(-1) ?? 0) + 1

        this.players.set(id, {
            ...player,
            id,
        });
        this.updatePlayers();
    }

    private setPlayers() {
        this.playersStub.forEach(player => this.players.set(player.id, player))
        this.updatePlayers();
    }

    private updatePlayers() {
        this.playersChange$.next([...this.players.values()]);
    }
}
