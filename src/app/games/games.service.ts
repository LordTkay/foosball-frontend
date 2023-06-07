import { computed, Injectable, signal } from '@angular/core';
import { Game, Games } from './game/game.model';
import { BehaviorSubject, delay, of, take, tap } from 'rxjs';
import { BackendService } from "../services/backend.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class GamesService {

    gamesFetched = new BehaviorSubject<boolean>(false)
    private gamesMap = signal<Map<Game['id'], Game>>(new Map())
    games = computed<Games>(() => Array.from(this.gamesMap().values()));

    constructor(private backendService: BackendService,
                private router: Router) {
        this.fetchGames();
    }

    public getGame(id: Game['id']) {
        return this.gamesMap().get(id);
    }

    public addGame(game: Omit<Game, 'id' | 'winner'>) {
        return this.backendService.addGame(game).pipe(
            tap(addedGame => {
                this.gamesMap.mutate(gamesMap => gamesMap.set(addedGame.id, addedGame));
            })
        );
    }

    public deleteGame(id: Game['id']) {
        return of(id)
            .pipe(
                take(1),
                delay(2000),
                tap(deletedId => {
                    this.gamesMap.mutate(gamesMap => {
                        gamesMap.delete(deletedId)
                    })
                })
            )
    }

    public editGame(game: Game) {
        return of(game)
            .pipe(
                take(1),
                delay(2000),
                tap(updatedGame => {
                    this.gamesMap.mutate(gamesMap => gamesMap.set(updatedGame.id, updatedGame));
                })
            )
    }

    public gameTrackBy(index: number, game: Game) {
        return game.id
    }

    private fetchGames() {
        this.backendService.getGames().subscribe({
            next: games => {
                this.gamesMap.set(new Map(games.map(game => [game.id, game])))
                this.gamesFetched.next(true)
            },
            error: error => {
                if (!(error instanceof HttpErrorResponse)) return
                this.router.navigate(['/http-http-error', error.status], {
                    skipLocationChange: true
                }).then();
            }
        })
    }
}
