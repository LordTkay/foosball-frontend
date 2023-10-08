import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ContextMenuComponent} from './components/context-menu/context-menu.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { NavigationComponent } from './components/context-menu/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    ContextMenuComponent,
    BackdropComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
