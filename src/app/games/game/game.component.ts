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

    colorFromYellow = signal('rgb(205,192,175)')
    colorToYellow = signal('rgb(163,149,133)')

    colorFromBlack = signal('rgb(139,112,151)')
    colorToBlack = signal('rgb(94,84,99)')
}
