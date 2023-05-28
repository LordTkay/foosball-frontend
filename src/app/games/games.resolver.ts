import {ResolveFn} from '@angular/router';
import {Games} from "./game/game.model";
import {inject} from "@angular/core";
import {GamesService} from "./games.service";

export const gamesResolver: ResolveFn<Games> = (route, state) => {
  const gamesService = inject(GamesService)
  return gamesService.fetchGames();
};
