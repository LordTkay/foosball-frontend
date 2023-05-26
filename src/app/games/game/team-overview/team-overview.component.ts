import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Game } from "../game.model";
import { Teams } from "../team.model";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-team-overview[game][teamName]',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamOverviewComponent implements OnInit {
  @Input() teamName!: Teams
  @HostBinding('class.winner') winner = false
  @HostBinding('class.loser') loser = false
  @HostBinding('class.draw') draw = false
  @HostBinding('class.perfect-win') perfectWin = false

  private _game!: Game;

  get game(): Game {
    return this._game;
  }

  @Input()
  set game(value: Game) {
    const initial = this._game == null
    this._game = value

    if (!initial) {
      this.setStylings();
    }
  }

  get score() {
    return this._game.scores[this.teamName]
  }

  get team() {
    return this._game.teams[this.teamName]
  }

  ngOnInit() {
    this.setStylings();
  }

  private setStylings() {
    this.draw = false;
    this.winner = false;
    this.loser = false;
    this.perfectWin = false;

    switch (this._game.winner) {
      case 'draw':
        this.draw = true
        break;
      case this.teamName:
        this.winner = true

        this.perfectWin = Object.entries(this._game.scores).reduce((perfectWin, [teamName, score]) => {
          if (teamName !== this.teamName && score > 0) return false
          return perfectWin && !(teamName === this.teamName && score < environment.pointToWin);
        }, true)

        break;
      default:
        this.loser = true
        break;
    }
  }
}
