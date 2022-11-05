import { Injectable } from '@angular/core';
import { Players } from "./player.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private players: Players = [
    { firstName: 'Tobias', lastName: 'Wagner', email: 'Tobias.Wagner@MetallRente-Services.de' },
    { firstName: 'Gareth', lastName: 'Schmutz' },
    { firstName: 'Sven', lastName: 'Hanl' }
  ];

  private playerChangeSubject = new BehaviorSubject(this.players);
  playerChange$ = this.playerChangeSubject.asObservable();

}
