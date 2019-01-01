import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpClient,
    HttpHandler, HttpEvent, HttpInterceptor,
    HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {

    currentRequest: HttpRequest<any>;

    constructor(
        private injector: Injector,
        private router: Router
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const auth = this.injector.get(AuthService);
        const token = (auth.isLoggedIn()) ? auth.getAuth()!.token : null;

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            // save current request
            this.currentRequest = request;

            return next.handle(request).pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // do nothing
                    }
                }, error => {
                    this.handleError(error);
                }));
        } else {
            return next.handle(request);
        }
    }

    handleError(err: any) {
        if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
                const auth = this.injector.get(AuthService);
                // JWT token might be expired:
                // try to get a new one using refresh token
                console.log('Token expired. Attempting refresh...');
                auth.refreshToken()
                    .subscribe(res => {
                    if (res) {
                        // refresh token successful
                        console.log('refresh token successful');

                        // re-submit the failed request
                        // TODO: auth loop

                        // const http = this.injector.get(HttpClient);
                        // http.request(this.currentRequest).subscribe(
                        //     result => {
                        //         // do something
                        //     }, error => console.error(error)
                        // );
                    } else {
                        // refresh token failed
                        console.log('refresh token failed');

                        // erase current token
                        auth.logout();

                        // redirect to login page
                        this.router.navigate(['login']);
                    }
                }, error => console.log(error));
            }
        }
        return throwError(err);
    }
}
