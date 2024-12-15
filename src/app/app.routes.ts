import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'games', pathMatch: 'full' },
    { path: 'games', loadComponent: () => import('./games').then(m => m.GamesComponent) },
    { path: 'players', loadComponent: () => import('./players').then(m => m.PlayersComponent) }
];
