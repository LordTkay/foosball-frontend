import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { Game } from '../game.model';
import { Teams } from '../team.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-team-overview[game][teamName]',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamOverviewComponent {
  @Input() teamName!: Teams;
  @Input() game!: Game;

  @HostBinding('class.winner') get winner() {
    return this.game.winner === this.teamName;
  }

  @HostBinding('class.loser') get loser() {
    return this.game.winner !== this.teamName && this.game.winner !== 'draw';
  }

  @HostBinding('class.draw') get draw() {
    return this.game.winner === 'draw';
  }

  @HostBinding('class.perfect-win') get perfectWin() {
    return Object.entries(this.game.scores).reduce((perfectWin, [teamName, score]) => {
      if (teamName !== this.teamName && score > 0) return false;
      return perfectWin && !(teamName === this.teamName && score < environment.pointToWin);
    }, true);
  }

  get score() {
    return this.game.scores[this.teamName];
  }

  get team() {
    return this.game.teams[this.teamName];
  }
}
