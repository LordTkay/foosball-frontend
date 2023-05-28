import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayersService } from "./players.service";

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersComponent {
  players = this.playersService.players
  playerTrackBy = this.playersService.playerTrackBy

  constructor(private playersService: PlayersService) {
  }

}
