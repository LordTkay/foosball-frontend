import { ChangeDetectionStrategy, Component, HostBinding, Input, WritableSignal } from '@angular/core';
import { Team, TeamPositions, Teams } from '../../game/team.model';
import { Player } from '../../../players/player/player.model';

@Component({
  selector: 'app-player-selection-button[position][teams][team][player]',
  templateUrl: './player-selection-button.component.html',
  styleUrls: ['./player-selection-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerSelectionButtonComponent {
  @Input() position!: TeamPositions;
  @Input() team!: Teams;
  @Input() teams!: WritableSignal<Record<Teams, Partial<Team>>>;
  @Input() player!: Player;
  @Input() disabled = false;

  get onOtherTeam() {
    return Object.entries(this.teams()).some(([team, teamValue]) => {
      if (team === this.team) return false;
      return Object.values(teamValue).some(player => this.player === player);
    });
  };

  @HostBinding('class.selected') get selected() {
    return this.teams()[this.team][this.position] === this.player;
  }

  onClick() {
    this.teams.mutate(teams => {
      teams[this.team][this.position] = !this.selected ? this.player : undefined;
    });
  }
}
