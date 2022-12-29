import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Player } from "./player.model";
import { PlayersService } from "../players.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ObjectToFormGroup } from "../../types/form-group.type";

// ToDo Adding spinner and waiting for the save on the backend to resolve

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
    @Output() destroy = new EventEmitter<void>();

    protected modifiedAttributes = new Set<keyof Player>();
    protected playerForm!: FormGroup<ObjectToFormGroup<Omit<Player, 'id'>>>
    protected newPlayer: boolean = false;
    private _player?: Player;

    private formSubscription?: Subscription;

    constructor(private playersService: PlayersService) {
    }

    get player(): Player {
        return this._player!
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

    ngOnInit() {
        if (!this._player) {
            this.newPlayer = true;
            this.player = {
                id: -1,
                firstName: '',
                lastName: ''
            }
        }
    }

    ngOnDestroy() {
        this.formSubscription?.unsubscribe();
    }

    /**
     * Cancel the editing and resets to the previous values.
     */
    onCancelEdit() {
        if (!this.newPlayer) {
            this.playerForm.reset()
        } else {
            this.destroy.emit()
        }
    }

    /**
     * Saves the changes to the database.
     */
    onSaveEdit() {
        this.playerForm.markAllAsTouched();
        if (this.playerForm.invalid || !this._player) return;

        const updatedPlayer = {
            ...this._player,
            ...this.playerForm.value
        };

        if (!this.newPlayer) {
            this.playersService.editPlayer(this._player.id, updatedPlayer)
        } else {
            this.playersService.addPlayer(updatedPlayer)
            this.destroy.emit()
        }
    }

    /**
     * Deletes the player from the database.
     */
    onDelete() {
        if (!this._player || this.newPlayer) return;

        this.playersService.deletePlayer(this._player.id)
    }

    /**
     * Created a new player form, with the given player values. This allows using the reset function of form-groups, to
     * simply resetting the controls
     * @param player
     * @private
     */
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

    private onPlayerFormChange() {
        return this.playerForm.valueChanges.subscribe(modifiedPlayer => {
            this.modifiedAttributes.clear();
            Object.entries(modifiedPlayer).forEach(([key, value]) => {
                const playerAttribute = key as keyof Player
                if (value !== this._player![playerAttribute]) {
                    this.modifiedAttributes.add(playerAttribute)
                }
            })
        });
    }
}
