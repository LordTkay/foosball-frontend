import { Component, input, numberAttribute } from '@angular/core';

@Component({
    selector: 'app-error',
    imports: [],
    templateUrl: './error.component.html',
    styleUrl: './error.component.scss'
})
export class ErrorComponent {
    status = input<number>(404);
}
