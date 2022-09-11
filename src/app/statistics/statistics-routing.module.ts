import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from "./games/games.component";
import { PlayersComponent } from "./players/players.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";

const routes: Routes = [
  { path: 'games', component: GamesComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: '', redirectTo: 'scoreboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule {
}
