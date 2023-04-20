import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { Player } from "./player.model";
import { PlayersService } from "../players.service";
import { deepClone } from "../../utility/deepCopy.function";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-player[player]',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {

    @ViewChild(NgForm) playerForm!: NgForm;
    loading: boolean = false
    playerState!: Player

    constructor(private playersService: PlayersService) {
    }

    _player!: Player

    @Input()
    set player(player: Player) {
        this.playerState = deepClone(player)
        this._player = deepClone(this.playerState);
        this.resetForm();
    }

    onSave() {
        this.loading = true;
        this.playersService.editPlayer(this._player.id, this._player)
            .subscribe(() => this.loading = false)
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
