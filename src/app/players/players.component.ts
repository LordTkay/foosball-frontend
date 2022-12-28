import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayersService } from "./players.service";

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit, OnDestroy {


    constructor(protected playersService: PlayersService) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }


}
