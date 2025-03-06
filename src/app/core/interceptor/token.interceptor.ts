import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log("intercepting")

        const token = window.localStorage.getItem("token");

        if (token) {
            if (request.url.includes("tmate.weiss-konrad.de") || request.url.includes("localhost")) {
                const modifiedReq = request.clone({
                    headers: request.headers.set('Authorization', 'Bearer ' + token),
                });

                console.log("accessing " + request.url + " with token");

                return next.handle(modifiedReq).pipe(
                    catchError((error) => {
                        if (error instanceof HttpErrorResponse && error.status === 401) {
                            this.authService.logout();
                        }
                        return throwError(() => error); // Rethrow error so services can still handle it
                    })
                );
            }
        }

        return next.handle(request);
    }
}
