import { Component, computed, effect, inject, ResourceStatus } from '@angular/core';
import { GamesService } from "./games.service";
import { Router } from "@angular/router";
import { rxResource } from "@angular/core/rxjs-interop";
import { LoadingComponent } from "../shared/loading/loading.component";
import { HttpErrorResponse } from "@angular/common/http";
import { Game, Games } from "./model/game.model";
import { DatePipe, KeyValuePipe } from "@angular/common";
import { PlayersService } from "../players/players.service";
import { Player, Players } from "../players/model/player.model";
import { GameComponent } from "./game/game.component";
import { TeamPositions, TeamSide } from "./model/team.model";
import { PlayersPerTeam } from "./game/players-per-team.model";

@Component({
    selector: 'app-games',
    imports: [
        LoadingComponent,
        KeyValuePipe,
        DatePipe,
        GameComponent
    ],
    templateUrl: './games.component.html',
    styleUrl: './games.component.scss'
})
export class GamesComponent {
    private gamesService = inject(GamesService)
    games = this.gamesService.games
    private playersService = inject(PlayersService)
    private router = inject(Router)
    private gamesResource = rxResource({
        loader: () => this.gamesService.fetchGames()
    })
    loading = computed(() => this.gamesResource.isLoading())
    private playersResource = rxResource({
        loader: () => this.playersService.fetchPlayers()
    })
    groupedGames = computed(() => {
        const gamesPerDay = new Map<string, Array<{game: Game, players: PlayersPerTeam}>>()

        if (this.playersResource.status() !== ResourceStatus.Resolved ||
            this.gamesResource.status() !== ResourceStatus.Resolved) {
            return gamesPerDay;
        }

        const games = this.gamesService.games().reverse()

        const dateFormatter = (date: Date) => `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`

        games.forEach((game) => {
            const date = dateFormatter(game.playDate)
            const existingGroup = gamesPerDay.get(date);

            const players: PlayersPerTeam = {
                yellow: {
                    attacker: this.playersService.get(game.teams.yellow.attacker)!,
                    defender: this.playersService.get(game.teams.yellow.defender)!,
                },
                black: {
                    attacker: this.playersService.get(game.teams.black.attacker)!,
                    defender: this.playersService.get(game.teams.black.defender)!,
                }
            }

            if (existingGroup) {
                existingGroup.push({ game, players })
            } else {
                gamesPerDay.set(date, [{ game, players }])
            }
        })

        return gamesPerDay;
    })

    constructor() {
        effect(() => {
            const error = this.gamesResource.error()
            if (!error) return;

            if (error instanceof HttpErrorResponse) {
                this.router.navigate(['http-error', error.status]).then()
            } else {
                this.router.navigate(['error']).then()
            }
        });
    }

    reverseSort() {
        return -1;
    }
}
