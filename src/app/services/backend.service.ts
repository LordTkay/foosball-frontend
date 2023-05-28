import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player, Players } from '../players/player/player.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) {
  }

  getPlayers() {
    return this.httpClient.get<Players>('api/players');
  }

  addPlayer(player: Omit<Player, 'id'>) {
    return this.httpClient.put<Player>('api/player', player);
  }

  deletePlayer(id: Player['id']) {
    return this.httpClient.delete<Player['id']>(`api/player/${ id }`);
  }

  editPlayer(player: Player) {
    return this.httpClient.patch<Player>(`api/player/${ player.id }`, player);
  }
}
