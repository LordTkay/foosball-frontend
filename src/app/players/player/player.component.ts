import { Component, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Player } from "./player.model";
import { EditableDirective } from "../../directives/editable.directive";
import { PlayersService } from "../players.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ObjectToFormGroup } from "../../types/form-group.type";

@Component({
    selector: 'app-player[player]',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnDestroy {

    /**
     * A list of all field that can be edited. It's used to reset the text to the previous value, if the editing is
     * canceled.
     */
    @ViewChildren(EditableDirective) editableFields!: QueryList<EditableDirective<HTMLDivElement, keyof Player>>

    constructor(private playersService: PlayersService) {
    }

    modifiedAttributes = new Set<keyof Player>();
    playerForm!: FormGroup<ObjectToFormGroup<Omit<Player, 'id'>>>
    private _player!: Player;
    private formSubscription?: Subscription;

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
        this.formSubscription?.unsubscribe();
        this.playerForm = this.getPlayerFormGroup(player);
        this.formSubscription = this.onPlayerFormChange();
    }

    ngOnDestroy() {
        this.formSubscription?.unsubscribe();
    }

    /**
     * Cancel the editing and resets to the previous values.
     */
    onCancelEdit() {
        this.playerForm.reset()
    }

    /**
     * Saves the changes to the database.
     */
    onSaveEdit() {
        this.playerForm.markAsTouched();
        if (this.playerForm.invalid) return;

        this.playersService.editPlayer(this._player.id, {
            ...this._player,
            ...this.playerForm.value
        })
    }

    private getPlayerFormGroup(player: Player): typeof this.playerForm {
        return new FormGroup({
            firstName: new FormControl<string>(player.firstName, {
                validators: [Validators.required],
                nonNullable: true
            }),
            lastName: new FormControl<string>(player.lastName, {
                validators: [Validators.required],
                nonNullable: true
            }),
            email: new FormControl<string | undefined>(player.email, { nonNullable: true })
        });
    }

    /**
     * Deletes the player from the database.
     */
    onDelete() {
        this.playersService.deletePlayer(this._player.id)
    }

    private onPlayerFormChange() {
        return this.playerForm.valueChanges.subscribe(modifiedPlayer => {
            this.modifiedAttributes.clear();
            Object.entries(modifiedPlayer).forEach(([key, value]) => {
                const playerAttribute = key as keyof Player
                if (value !== this._player[playerAttribute]) {
                    this.modifiedAttributes.add(playerAttribute)
                }
            })
        });
    }
}
