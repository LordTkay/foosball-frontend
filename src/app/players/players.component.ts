import { Component, OnInit } from '@angular/core';
import { PlayersService } from "./players.service";
import { Player } from "./player.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  editedPlayers = new Map<number, Player>();

  private subscriptions = new Subscription();

  constructor(public playersService: PlayersService) {
  }

  ngOnInit(): void {

    const x = "";
    //    ^?
    // this.subscriptions.add(this.onPlayersChange())
  }

  onPlayerChange<T extends Player>(event: Event,
                                   player: T,
                                   attribute: keyof T) {
    const target = event.target as HTMLTableCellElement;
    this.editedPlayers.set(player.id, {
      ...player,
      ...this.editedPlayers.get(player.id) ?? {},
      [attribute]: target.innerText
    })
  }


  // private onPlayersChange() {
  //   return this.playersService.playerChange$.subscribe(players => {
  //     // this.players = players;
  //   });
  // }
  onDeletePlayer(player: Player) {

  }
}
