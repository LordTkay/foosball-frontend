import { ResolveFn } from '@angular/router';
import { inject } from "@angular/core";
import { GamesService } from "./games.service";
import { filter, take } from "rxjs";

export const gamesResolver: ResolveFn<boolean> = (route, state) => {
    const gamesService = inject(GamesService)
    return gamesService.gamesFetched
        .asObservable()
        .pipe(
            filter(fetched => fetched),
            take(1)
        );
};
