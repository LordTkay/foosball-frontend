import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {

}
