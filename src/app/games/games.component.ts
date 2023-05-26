import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GamesService } from "./games.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent {

  games = this.gamesService.games;
  gameTrackBy = this.gamesService.gameTrackBy;

  constructor(private gamesService: GamesService) {
  }

}
