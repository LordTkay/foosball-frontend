import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {PlayersService} from "./players.service";
import {Players} from "./player/player.model";

export const playersResolver: ResolveFn<Players> = (route, state) => {
  const playersService = inject(PlayersService)
  return playersService.fetchPlayers();
};
