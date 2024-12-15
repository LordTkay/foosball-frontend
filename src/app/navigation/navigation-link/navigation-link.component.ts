import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navigation-link',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navigation-link.component.html',
  styleUrl: './navigation-link.component.scss'
})
export class NavigationLinkComponent {

  link = input.required<string>()
  icon = input<string | null | undefined>(null);

}
