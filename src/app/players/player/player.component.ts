import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Player } from "./player.model";
import { PlayersService } from "../players.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ObjectToFormGroup } from "../../types/form-group.type";

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
    @Output() destroy = new EventEmitter<void>();

    protected isLoading: boolean = false;
    protected modifiedAttributes = new Set<keyof Player>();
    protected playerForm!: FormGroup<ObjectToFormGroup<Omit<Player, 'id'>>>
    protected newPlayer: boolean = false;
    private formSubscription?: Subscription;

    constructor(private playersService: PlayersService) {
    }

    private _player?: Player;

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
        this.modifiedAttributes.clear();

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
        if (this.playerForm.disabled || this.playerForm.invalid || !this._player) return;

        this.setLoading(true)

        const updatedPlayer = {
            ...this._player,
            ...this.playerForm.value
        };

        if (!this.newPlayer) {
            this.playersService.editPlayer(this._player.id, updatedPlayer).subscribe({
                next: () => this.setLoading(false),
                error: () => this.setLoading(false)
            })
        } else {
            this.playersService.addPlayer(updatedPlayer).subscribe({
                next: () => {
                    this.setLoading(false);
                    this.destroy.emit()
                },
                error: () => this.setLoading(false)
            })
        }
    }

    /**
     * Deletes the player from the database.
     */
    onDelete() {
        if (!this._player || this.newPlayer) return;

        // ToDo Add a proper modal
        const answer = confirm('Are you sure you wanna delete?')
        if (!answer) return;

        this.setLoading(true)

        this.playersService.deletePlayer(this._player.id).subscribe({
            next: () => this.setLoading(false),
            error: () => this.setLoading(false)
        })
    }

    onKeyDown(event: KeyboardEvent) {
        const hasChanged = (this.modifiedAttributes.size !== 0 || this.newPlayer);
        if (event.key === 'Escape' && hasChanged) {
            // Cancel the current edit, when pressing ESC
            this.onCancelEdit()
        } else if (event.key === 'Enter' && event.ctrlKey && hasChanged) {
            // Saves the current edit, when pressing CTRL+Enter
            this.onSaveEdit();
        }

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
            email: new FormControl<string | undefined>(player.email, {
                validators: [Validators.pattern(".+@.+\\..+")],
                nonNullable: true
            })
        });
    }

    private onPlayerFormChange() {
        return this.playerForm.valueChanges.subscribe(modifiedPlayer => {
            this.modifiedAttributes.clear();
            Object.entries(modifiedPlayer).forEach(([key, value]) => {
                const playerAttribute = key as keyof Player
                const playerValue = this._player![playerAttribute];

                if (value !== playerValue && (!!value || playerValue != null)) {
                    this.modifiedAttributes.add(playerAttribute)
                }
            })
        });
    }

    private setLoading(isLoading: boolean) {
        this.isLoading = isLoading;
        if (this.isLoading) {
            this.playerForm.disable()
        } else {
            this.playerForm.enable()
        }
    }
}
