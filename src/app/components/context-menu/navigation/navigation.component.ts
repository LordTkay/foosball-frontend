import { Component } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['../pill-button.scss', './navigation.component.scss'],
  animations: [
    trigger('expandCollapse', [

      transition(':enter', [
        style({
          width: '0',
          paddingRight: '0'
        }),
        animate('300ms ease-in-out', style({
          width: '*'
        }))
      ]),

      transition(':leave', [
        animate('300ms ease-in-out', style({
          width: '0',
          paddingRight: '0'
        }))
      ])
    ]),
  ]
})
export class NavigationComponent {
  protected state: 'collapsed' | 'expanded' = 'collapsed';

  changeState() {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
  }
}
