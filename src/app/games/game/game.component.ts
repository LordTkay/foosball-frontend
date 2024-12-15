import { Component, input } from '@angular/core';
import { Game } from "../model/game.model";
import { PlayerIconComponent } from "../../shared/player-icon/player-icon.component";
import { PlayersPerTeam } from "./players-per-team.model";

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
}
