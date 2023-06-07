import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { GamesComponent } from './games/games.component';
import { GameEditComponent } from './games/game-edit/game-edit.component';
import { gameGuard } from './games/game.guard';
import { gamesResolver } from "./games/games.resolver";
import { playersResolver } from "./players/playersResolver";
import { HttpErrorComponent } from "./components/http-error/http-error.component";
import { FoosballComponent } from "./foosball/foosball.component";

const routes: Routes = [
    {
        path: '',
        component: FoosballComponent,
        resolve: [playersResolver, gamesResolver],
        children: [
            { path: '', redirectTo: 'games', pathMatch: 'full' },
            { path: 'players', component: PlayersComponent },
            { path: 'scoreboard', component: ScoreboardComponent },
            {
                path: 'games',
                children: [
                    { path: '', component: GamesComponent, pathMatch: 'full' },
                    { path: ':id/edit', component: GameEditComponent, canActivate: [gameGuard] },
                    { path: 'new', component: GameEditComponent, data: { newEntry: true } }
                ]
            },
        ]
    },
    {
        path: 'http-http-error/:code',
        component: HttpErrorComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
