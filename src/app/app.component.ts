import {Component} from '@angular/core';
import {ResolveEnd, Router} from "@angular/router";
import {filter, take} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'foosball-frontend';
  loading = true;

  constructor(private router: Router) {
    router.events
      .pipe(
        filter((event): event is ResolveEnd => event instanceof ResolveEnd),
        take(1)
      )
      .subscribe(x => {
        this.loading = false;
      })
  }
}
