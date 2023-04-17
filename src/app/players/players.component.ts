import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayersService } from "./players.service";
import { deepClone } from "../utility/deepCopy.function";
import { map } from "rxjs";
import { animate, style, transition, trigger } from "@angular/animations";
import { Player } from "./player/player.model";

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('appearanceAnimation', [
            transition(':enter', [
                style({ translate: '100%' }),
                animate('500ms', style({ translate: '0' })),
            ]),
            transition(':leave', [
                style({ translate: 0 }),
                animate('500ms', style({ translate: '-100%' })),
            ])
        ]),
    ]
})
export class PlayersComponent {

    players$ = this.playersService.players$
        .pipe(map((players) => deepClone(players)))

    playerTrackBy = (index: number, player: Player) => this.playersService.playerTrackBy(index, player)

    constructor(private playersService: PlayersService) {
    }

}
