import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-http-error',
    templateUrl: './http-error.component.html',
    styleUrls: ['./http-error.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpErrorComponent implements OnInit {
    statusCode!: string;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.statusCode = this.activatedRoute.snapshot.paramMap.get('code')!;
    }
}
