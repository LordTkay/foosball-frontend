import { Component, input } from '@angular/core';
import { Game } from "../model/game.model";

@Component({
    selector: 'app-game',
    imports: [],
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss'
})
export class GameComponent {
    game = input.required<Game>();
}
