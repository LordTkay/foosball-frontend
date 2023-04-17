import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayersService } from "./players.service";
import { deepClone } from "../utility/deepCopy.function";
import { map } from "rxjs";

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersComponent {

    players$ = this.playersService.players$
        .pipe(map((players) => deepClone(players)!))

    constructor(private playersService: PlayersService) {
    }

}
