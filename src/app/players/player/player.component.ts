import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from "./player.model";
import { PlayersService } from "../players.service";
import { deepClone } from "../../utility/deepCopy.function";

@Component({
    selector: 'app-player[player]',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {

    constructor(private playersService: PlayersService) {
    }

    _player!: Player

    @Input()
    set player(player: Player) {
        this._player = deepClone(player);
    }

}
