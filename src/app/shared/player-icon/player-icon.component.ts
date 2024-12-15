import { Component, input } from '@angular/core';
import { Player } from "../../players/model/player.model";

@Component({
  selector: 'app-player-icon',
  imports: [],
  templateUrl: './player-icon.component.html',
  styleUrl: './player-icon.component.scss'
})
export class PlayerIconComponent {
  player = input.required<Player>();
}
