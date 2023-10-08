import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
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
    ])
  ]
})
export class ContextMenuComponent {

  protected state: 'collapsed' | 'expanded' = 'collapsed';

  changeState() {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
  }
}
