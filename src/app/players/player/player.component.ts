import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { Player } from "./player.model";
import { EditableDirective } from "../../directives/editable.directive";
import { PlayersService } from "../players.service";

@Component({
    selector: 'app-player[player]',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

    /**
     * A list of all field that can be edited. It's used to reset the text to the previous value, if the editing is
     * canceled.
     */
    @ViewChildren(EditableDirective) editableFields!: QueryList<EditableDirective<HTMLDivElement, keyof Player>>
    protected editedPlayer?: Partial<Player>;

    constructor(private playersService: PlayersService) {
    }

    protected _player!: Player;

    get player(): Player {
        return this._player;
    }

    /**
     * Insert which player should be displayed
     * @param player
     */
    @Input()
    set player(player: Player) {
        this._player = player;
    }

    /**
     * Every change made in one of the editable field will be saved into an object, which will be used to change the
     * player, if the user decides to save.
     * @param event
     * @param attribute
     */
    onInput(event: Event, attribute: Exclude<keyof Player, 'id'>) {
        const target = event.target as HTMLDivElement
        this.editedPlayer ??= {}

        this.editedPlayer[attribute] = target.innerText;
    }

    /**
     * Cancel the editing and resets to the previous values.
     */
    onCancelEdit() {
        this.editableFields.forEach(editableField => {
            const value = this._player[editableField.attributeName];
            editableField.elementRef.nativeElement.innerText = value?.toString() ?? '';
        })
        this.editedPlayer = undefined;
    }

    /**
     * Saves the changes to the database.
     */
    onSaveEdit() {
        this.playersService.editPlayer(this._player.id, {
            ...this._player,
            ...this.editedPlayer
        })
        this.editedPlayer = undefined;
    }

    /**
     * Deletes the player from the database.
     */
    onDelete() {
        this.playersService.deletePlayer(this._player.id)
    }
}
