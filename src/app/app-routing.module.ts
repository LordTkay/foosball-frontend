import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from "./players/players.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";

const routes: Routes = [
  {path: 'players', component: PlayersComponent},
  {path: 'scoreboard', component: ScoreboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
