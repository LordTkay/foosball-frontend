import { Component, computed, HostBinding, input } from '@angular/core';
import { Player } from "../model/player.model";
import { getColorInRange, getRgbValues, toHex } from "../../utility/color";

@Component({
    selector: 'app-player-icon',
    imports: [],
    templateUrl: './player-icon.component.html',
    styleUrl: './player-icon.component.scss'
})
export class PlayerIconComponent {
    player = input.required<Player>();
    initials = computed(() => {
        return (this.player().firstName.at(0) ?? '') + (this.player().lastName.at(0) ?? '')
    })

    colorFrom = input.required<string>()
    colorTo = input.required<string>()
    icon = input<string | null | undefined>(null)

    @HostBinding('style.--bubble-color')
    get playerColor() {
        const initials = this.initials()
        const firstLetter = initials.charCodeAt(0) - 65;
        const secondLetter = initials.charCodeAt(1) - 65;

        const colorFrom = getRgbValues(this.colorFrom())
        const colorTo = getRgbValues(this.colorTo())


        return getColorInRange(colorFrom, colorTo, {
            red: firstLetter * 5,
            green: secondLetter * 5,
            blue: firstLetter + secondLetter * 5,
        })
    }


}
