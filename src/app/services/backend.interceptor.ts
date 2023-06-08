import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        const modifiedRequest = request.clone();
        modifiedRequest.headers.set('Access-Control-Allow-Origin', '*');

        return next.handle(modifiedRequest).pipe(
            retry({ count: 3, delay: 2000 })
        );
    }
}
