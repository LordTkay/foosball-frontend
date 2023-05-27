import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, ElementRef, Optional, Self, signal } from '@angular/core';
import { GamesService } from '../../games.service';
import { PlayersService } from '../../../players/players.service';
import { Team, TeamPositions, Teams } from '../../game/team.model';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { deepClone } from '../../../utility/deepCopy.function';
import { PlayerStats } from '../../../players/player/player.model';
import { SortDirection } from '../../../pipes/sort-by-date.model';

@Component({
  selector: 'app-player-selection',
  templateUrl: './player-selection.component.html',
  styleUrls: ['./player-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PlayerSelectionComponent implements ControlValueAccessor, Validator {
  disabled: boolean = false;
  teams = signal<Record<Teams, Partial<Team>>>({ black: {}, yellow: {} });
  players = this.playersService.players;
  onTouched?: () => void;
  private onChange?: (value: any) => void;

  constructor(private gamesService: GamesService,
              private playersService: PlayersService,
              private elementRef: ElementRef<HTMLElement>,
              private changeDetectorRef: ChangeDetectorRef,
              @Optional() @Self() private ngControl?: NgControl) {

    if (this.ngControl?.control) {
      this.ngControl.valueAccessor = this;
      this.ngControl.control.addValidators(this.validate.bind(this));
    }

    effect(() => {
      const teams = this.teams();
      if (JSON.stringify(this.ngControl?.value) !== JSON.stringify(teams)) {
        this.onChange?.(deepClone(teams));
      }
    });
  }

  sortGames(a: PlayerStats, b: PlayerStats, direction: SortDirection) {
    return (a.games() - b.games()) * (direction === 'desc' ? 1 : -1);
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(teams: Record<Teams, Partial<Team>> | null | undefined): void {
    if (teams != null) {
      this.teams.set(deepClone(teams));
    } else {
      this.teams.set({ black: {}, yellow: {} });
    }
  }

  /**
   * Validates if all positions are filled
   * @param control
   */
  validate(control: AbstractControl): ValidationErrors | null {
    // ToDo Using ZOD to validate the teams, so that even on changing/additional teams or positions, the validation is still working

    const missingMembers = new Map<Teams, TeamPositions>();

    if (this.teams().yellow.defender == null) {
      missingMembers.set('yellow', 'defender');
    }
    if (this.teams().yellow.attacker == null) {
      missingMembers.set('yellow', 'attacker');
    }
    if (this.teams().black.defender == null) {
      missingMembers.set('black', 'defender');
    }
    if (this.teams().black.attacker == null) {
      missingMembers.set('black', 'attacker');
    }

    if (missingMembers.size > 0) {
      return { missingMembers: Array.from(missingMembers.entries()) };
    }

    return null;
  }


  ngClasses() {
    return Array.from(this.elementRef.nativeElement.classList).filter(cssClass => cssClass.startsWith('ng-'));
  }
}
