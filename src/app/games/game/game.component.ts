import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Game } from './game.model';

@Component({
  selector: 'app-game[game]',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {

  @Input() game!: Game

}
