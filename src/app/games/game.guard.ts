import {CanActivateFn, Router} from '@angular/router';
import {GamesService} from './games.service';
import {inject} from '@angular/core';

export const gameGuard: CanActivateFn = (route, state) => {

  const gamesService = inject(GamesService);
  const currentId = route.paramMap.get('id');

  if (currentId == null || isNaN(+currentId)) {
    throw new Error('No game id provided!');
  }

  const game = gamesService.getGame(+currentId);
  if (game == null) {
    const router = inject(Router)
    router.navigate(['/games']).then();
    return false;
  }
  return true
};
