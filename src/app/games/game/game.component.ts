import { Component, input, signal } from '@angular/core';
import { PlayerIconComponent } from "../../shared/player-icon/player-icon.component";
import { PlayersPerTeam } from "./players-per-team.model";
import { Game } from "../../shared/model/game.model";

@Component({
    selector: 'app-game',
    imports: [
        PlayerIconComponent
    ],
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss'
})
export class GameComponent {
    game = input.required<Game>();
    players = input.required<PlayersPerTeam>()

    colorFromYellow = signal('rgb(179, 140, 114)')
    colorToYellow = signal('rgb(246, 214, 9)')

    colorFromBlack = signal('rgb(29,17,30)')
    colorToBlack = signal('rgb(97,15,138)')
}
