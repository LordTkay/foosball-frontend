import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Player } from "./player.model";
import { PlayersService } from "../players.service";
import { deepClone } from "../../utility/deepCopy.function";
import { NgForm } from "@angular/forms";
import { finalize } from "rxjs";

@Component({
    selector: 'app-player[player], app-new-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnInit {

    @ViewChild(NgForm) playerForm!: NgForm;
    loading: boolean = false
    playerState!: Omit<Player, 'playedGames' | 'creationDate' | 'updateDate'>
    newPlayer = false

    constructor(private playersService: PlayersService,
                private changeDetectorRef: ChangeDetectorRef) {
    }

    _player!: Omit<Player, 'playedGames' | 'creationDate' | 'updateDate'>

    @Input()
    set player(player: Omit<Player, 'playedGames' | 'creationDate' | 'updateDate'>) {
        this.playerState = deepClone(player)
        this._player = deepClone(this.playerState);
        this.resetForm();
    }

    ngOnInit() {
        if (!this._player) {
            this.newPlayer = true;
            this.player = {
                id: -1,
                firstName: "",
                lastName: "",
                email: ""
            };
        }
    }

    onSave() {
        this.playerForm.control.markAllAsTouched();

        if (!this.playerForm.valid) return
        this.loading = true;
        if (this.newPlayer) {
            this.playersService.addPlayer(this._player)
                .pipe(finalize(() => {
                    this.loading = false
                    this.changeDetectorRef.markForCheck();
                }))
                .subscribe(() => {
                    this.resetForm();
                });
        } else {
            this.playersService.editPlayer(this._player)
                .pipe(finalize(() => {
                    this.loading = false
                    this.changeDetectorRef.markForCheck();
                }))
                .subscribe();
        }
    }

    resetForm() {
        if (!this.playerForm) return
        this.playerForm.resetForm(deepClone(this.playerState))
    }

    onDelete() {
        this.loading = true;
        this.playersService.deletePlayer(this._player.id)
            .subscribe(() => this.loading = false);
    }

    onEscape(event: Event) {
        const target = event.target as HTMLElement

        target.blur()
        this.resetForm();
    }

    onEnter() {
        this.playerForm.control.markAllAsTouched();
    }
}
