import { Component, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { PlayersService } from "./players.service";
import { PlayerComponent } from "./player/player.component";
import { Subscription, take } from "rxjs";

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnDestroy {

    @ViewChild('playersList', { read: ViewContainerRef }) playersList!: ViewContainerRef;

    private subscriptions = new Subscription();

    constructor(protected playersService: PlayersService) {
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    /**
     * Appends a player components to the list. It listens to the destroy event, to destroy itself if needed.
     */
    onAddPlayer() {
        const newPlayerComponentRef = this.playersList.createComponent(PlayerComponent)
        const destroySubscription = newPlayerComponentRef.instance
            .destroy
            .pipe(take(1))
            .subscribe(() => {
                newPlayerComponentRef.destroy();
            });
        this.subscriptions.add(destroySubscription);
    }
}
