import {booleanAttribute, Component, HostBinding, Input} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
  animations: [
    trigger('dissolve', [

      transition(':enter', [
        style({
          opacity: '0'
        }),
        animate('300ms ease-in-out', style({
          opacity: '*'
        }))
      ]),

      transition(':leave', [
        animate('300ms ease-in-out', style({
          opacity: '0'
        }))
      ])
    ])
  ]
})
export class BackdropComponent {
  @Input({required: true, transform: booleanAttribute}) show = false;
}
