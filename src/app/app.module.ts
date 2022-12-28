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
import { EditableDirective } from './directives/editable.directive';
import { ReactiveFormsModule } from "@angular/forms";

registerLocaleData(localeDe)

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NavigationComponent,
        ScoreboardComponent,

        PlayersComponent,
        PlayerComponent,
        EditableDirective,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,

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
