import { Component, computed, effect, inject } from '@angular/core';
import { GamesService } from "./games.service";
import { Router } from "@angular/router";
import { rxResource } from "@angular/core/rxjs-interop";
import { LoadingComponent } from "../shared/loading/loading.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-games',
    imports: [
        LoadingComponent
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
    loading = computed(() => this.resource.isLoading())

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
