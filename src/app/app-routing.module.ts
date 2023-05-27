import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { GamesComponent } from './games/games.component';
import { GameEditComponent } from './games/game-edit/game-edit.component';
import { gameGuard } from './games/game.guard';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
