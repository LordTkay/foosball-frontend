import { Injectable } from '@angular/core';
import { Player, Players } from "./player.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private players: Players = [
    { id: 0, firstName: 'Tobias', lastName: 'Wagner', email: 'Tobias.Wagner@MetallRente-Services.de' },
    { id: 1, firstName: 'Gareth', lastName: 'Schmutz' },
    { id: 2, firstName: 'Sven', lastName: 'Hanl' }
  ];

  private playerChangeSubject = new BehaviorSubject(this.players);
  playerChange$ = this.playerChangeSubject.asObservable();


  public playerTrackBy(index: number, player: Player) {
    return player.id;
  }
}
