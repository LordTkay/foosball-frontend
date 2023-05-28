import { ResolveFn } from '@angular/router';
import { inject } from "@angular/core";
import { PlayersService } from "./players.service";
import { filter, take } from "rxjs";

export const playersResolver: ResolveFn<boolean> = (route, state) => {
  const playersService = inject(PlayersService)
  return playersService.playersFetched
      .asObservable()
      .pipe(
          filter(fetched => fetched),
          take(1)
      );
};
