import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from "./player.model";
import { PlayersService } from "../players.service";

@Component({
    selector: 'app-player[player]',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {

    @Input() player!: Player

    constructor(private playersService: PlayersService) {
    }

}
