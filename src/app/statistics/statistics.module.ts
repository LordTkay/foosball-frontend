import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { GamesComponent } from './games/games.component';
import { PlayersComponent } from './players/players.component';


@NgModule({
  declarations: [
    ScoreboardComponent,
    GamesComponent,
    PlayersComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }
