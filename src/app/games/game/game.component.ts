import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Game } from "./game.model";
import { TEAMS, Teams } from "./team.model";

@Component({
  selector: 'app-game[game]',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {

  @Input() game!: Game

  getTeam(teamName: Teams | string | undefined | null) {
    if (teamName == null || Object.values(TEAMS).findIndex(team => teamName) === -1) {
      throw Error(`Team ${ teamName } does not exist!`)
    }

    return {
      score: this.game.scores[teamName as Teams],
      team: this.game.teams[teamName as Teams]!,
      winner: this.game.winner
    }
  }

}
