import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Player } from "./player.model";
import { PlayersService } from "../players.service";
import { deepClone } from "../../utility/deepCopy.function";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-player[player], app-new-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnInit {

    @ViewChild(NgForm) playerForm!: NgForm;
    loading: boolean = false
    playerState!: Player
    newPlayer = false

    constructor(private playersService: PlayersService) {
    }

    _player!: Player

    @Input()
    set player(player: Player) {
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
                .subscribe(() => {
                    console.log('Added')
                    this.loading = false;
                    this.resetForm();
                });
        } else {
            this.playersService.editPlayer(this._player.id, this._player)
                .subscribe(() => this.loading = false);
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
}
