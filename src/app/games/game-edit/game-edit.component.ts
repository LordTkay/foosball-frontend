import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../game/game.model';
import { PlayersService } from '../../players/players.service';
import { Player } from '../../players/player/player.model';
import { TeamPositions, Teams } from '../game/team.model';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameEditComponent implements OnInit {
  game!: Omit<Game, 'teams' | 'scores'> & {
    teams: Record<Teams, Partial<Record<TeamPositions, Player['id']>>>,
    scores: Record<Teams, number | null>
  };
  players = this.playersService.players;
  loading: boolean = false;
  private newEntry = false;

  constructor(private gamesService: GamesService,
              private playersService: PlayersService,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  get date() {
    return new Date().toISOString().slice(0, 16);
  }

  get winner(): Game['winner'] {
    if (this.game.scores.yellow != null && this.game.scores.black != null) {
      if (this.game.scores.yellow === this.game.scores.black) return 'draw';
      if (this.game.scores.yellow > this.game.scores.black) return 'yellow';
      if (this.game.scores.yellow < this.game.scores.black) return 'black';
    }

    return 'draw';
  }

  ngOnInit() {
    this.newEntry = this.activatedRoute.snapshot.data['newEntry'] === true;

    if (!this.newEntry) {
      // The has to exist, because a Guard is checking the existing of the entry
      const currentId = this.activatedRoute.snapshot.paramMap.get('id');
      this.game = this.gamesService.getGame(+currentId!)!;
    } else {
      this.game = {
        id: -1,
        playDate: new Date(),
        scores: {
          yellow: null,
          black: null
        },
        teams: {
          black: {},
          yellow: {}
        },
        winner: 'draw'
      };
    }
  }

  onClose() {
    this.router.navigate(['games']).then();
  }

  onSubmit(form: NgForm) {
    form.control.markAllAsTouched();
    if (!form.valid) return;

    this.game.winner = this.winner;

    form.control.disable();
    this.loading = true;

    let targetFunction: keyof typeof this.gamesService = 'addGame';
    if (!this.newEntry) {
      targetFunction = 'editGame';
    }

    this.gamesService[targetFunction](this.game as Game)
      .pipe(finalize(() => {
        form.control.enable();
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      }))
      .subscribe(() => {
        this.onClose();
      });
  }

  onDateChange(dateTime: string) {
    this.game.playDate = new Date(dateTime);
  }
}
