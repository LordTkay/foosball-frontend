import { ChangeDetectionStrategy, Component, effect, ElementRef, Optional, Self, signal } from '@angular/core';
import { GamesService } from '../../games.service';
import { PlayersService } from '../../../players/players.service';
import { Team, TeamPositions, Teams } from '../../game/team.model';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { deepClone } from '../../../utility/deepCopy.function';

@Component({
  selector: 'app-player-selection',
  templateUrl: './player-selection.component.html',
  styleUrls: ['./player-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
              @Optional() @Self() private ngControl?: NgControl) {

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      this.ngControl.control?.addValidators(this.validate.bind(this));
    }

    effect(() => {
      const teams = this.teams();
      if (JSON.stringify(this.ngControl?.value) !== JSON.stringify(teams)) {
        this.onChange?.(deepClone(teams));
      }
    });
  }

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

    const missingMembers: [Teams, TeamPositions][] = [];

    if (!this.teams().yellow.defender) {
      missingMembers.push(['yellow', 'defender']);
    }
    if (!this.teams().yellow.attacker) {
      missingMembers.push(['yellow', 'attacker']);
    }
    if (!this.teams().black.defender) {
      missingMembers.push(['black', 'defender']);
    }
    if (!this.teams().black.attacker) {
      missingMembers.push(['black', 'attacker']);
    }

    if (missingMembers.length > 0) {
      return { missingMembers };
    }

    return null;
  }


  ngClasses() {
    return Array.from(this.elementRef.nativeElement.classList).filter(cssClass => cssClass.startsWith('ng-'));
  }
}
