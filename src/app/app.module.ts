import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import localeDe from '@angular/common/locales/de';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PlayersComponent } from './players/players.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { PlayerComponent } from './players/player/player.component';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoadingComponent } from './components/loading-spinner/loading.component';
import { GameComponent } from './games/game/game.component';
import { GamesComponent } from './games/games.component';
import { TeamOverviewComponent } from './games/game/team-overview/team-overview.component';
import { SortByPipe } from "./pipes/sort-by-date.pipe";

registerLocaleData(localeDe)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    LoadingComponent,

    ScoreboardComponent,
    PlayersComponent,
    PlayerComponent,
    GamesComponent,
    GameComponent,
    TeamOverviewComponent,

    SortByPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,

    AppRoutingModule
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: LOCALE_ID, useValue: 'de' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
