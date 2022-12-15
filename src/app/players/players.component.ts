import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayersService } from "./players.service";
import { Player, Players } from "./player.model";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit, OnDestroy {
    players!: Players;
    editedPlayers = new Map<number, Player>();

    private subscriptions = new Subscription();

    constructor(protected playersService: PlayersService) {
    }

    ngOnInit(): void {
        this.subscriptions.add(this.onPlayersChange())
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }


    onPlayerChange<T extends Player>(event: Event,
                                     player: T,
                                     attribute: keyof T) {
        const target = event.target as HTMLTableCellElement;
        this.editedPlayers.set(player.id, {
            ...player,
            ...this.editedPlayers.get(player.id) ?? {},
            [attribute]: target.innerText
        })
    }

    onDeletePlayer(player: Player) {
        this.playersService.deletePlayer(player.id);
    }

    /**
     * Removed the editing flag and resets all values to their default
     * @param id
     * @param playerRowElement
     */
    onCancelPlayerEdit(id: Player['id'], playerRowElement: HTMLTableRowElement) {
        const oldPlayer = this.playersService.getPlayer(id);

        if (oldPlayer == null) {
            // ToDo Own Error Class
            throw Error(`Player ${id} not found!`);
        }

        Array.from(playerRowElement.children).forEach(childElement => {
            if (childElement.id == null) return;
            if (!(childElement.id in oldPlayer)) return;
            if (!(childElement instanceof HTMLTableCellElement)) return;

            childElement.innerText = oldPlayer[childElement.id as keyof Player]?.toString() ?? '';
        })

        this.editedPlayers.delete(id)
    }

    onSavePlayer(id: Player['id']) {
        const editedPlayer = this.editedPlayers.get(id);
        if (editedPlayer == null) {
            // ToDo Own Error Class
            throw Error(`Player ${id} not found!`);
        }
        this.playersService.editPlayer(editedPlayer);
        this.editedPlayers.delete(id)
    }

    private onPlayersChange() {
        return this.playersService.playerChangeSubject.subscribe(players => {
            this.players = players
        });
    }
}
