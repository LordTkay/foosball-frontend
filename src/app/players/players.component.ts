import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayersService } from "./players.service";
import { animate, style, transition, trigger } from "@angular/animations";

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
  players = this.playersService.players
  playerTrackBy = this.playersService.playerTrackBy

  constructor(private playersService: PlayersService) {
  }

}
