import { Component, computed, effect, inject } from '@angular/core';
import { GamesService } from "./games.service";
import { Router } from "@angular/router";
import { rxResource } from "@angular/core/rxjs-interop";
import { LoadingComponent } from "../shared/loading/loading.component";
import { HttpErrorResponse } from "@angular/common/http";
import { GameComponent } from "./game/game.component";
import { Games } from "./model/game.model";
import { DatePipe, KeyValue, KeyValuePipe } from "@angular/common";

@Component({
    selector: 'app-games',
    imports: [
        LoadingComponent,
        GameComponent,
        KeyValuePipe,
        DatePipe
    ],
    templateUrl: './games.component.html',
    styleUrl: './games.component.scss'
})
export class GamesComponent {
    private gamesService = inject(GamesService)
    games = this.gamesService.games
    private router = inject(Router)
    private resource = rxResource({
        loader: () => {
            return this.gamesService.fetchGames()
        }
    })

    groupedGames = computed(() => {
        const games = this.gamesService.games().reverse()
        const gamesPerDay = new Map<string, Games>
        const dateFormatter = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

        games.forEach((game) => {
            const date = dateFormatter(game.playDate)
            const existingGroup = gamesPerDay.get(date);

            if (existingGroup) {
                existingGroup.push(game)
            } else {
                gamesPerDay.set(date, [game])
            }
        })

        return gamesPerDay;
    })

    loading = computed(() => this.resource.isLoading())

    reverseSort(a: KeyValue<string, Games>, b: KeyValue<string, Games>) {
        return -1;
    }

    constructor() {
        effect(() => {
            const error = this.resource.error()
            if (!error) return;

            if (error instanceof HttpErrorResponse) {
                this.router.navigate(['http-error', error.status]).then()
            } else {
                this.router.navigate(['error']).then()
            }
        });
    }
}
