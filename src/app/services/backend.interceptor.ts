import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { delay, Observable, retry } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        if (!environment.production) {
            return next.handle(request).pipe(delay(2000));
        }

        return next.handle(request).pipe(
            retry({ count: 3, delay: 2000 })
        );
    }
}
