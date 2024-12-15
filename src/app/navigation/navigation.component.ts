import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NavigationLinkComponent } from "./navigation-link/navigation-link.component";

@Component({
    selector: 'app-navigation',
    imports: [
        NavigationLinkComponent
    ],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

}
