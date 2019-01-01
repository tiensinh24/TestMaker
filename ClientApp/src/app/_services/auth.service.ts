import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import 'rxjs';
import { TokenResponse } from '../_models/token-response';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
    authKey = 'auth';
    clientId = 'TestMaker';

    constructor(private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: any) {
    }

    // performs the login
    login(username: string, password: string) {
        const url = 'api/token/auth';
        const data = {
            username: username,
            password: password,
            client_id: this.clientId,
            // required when signing up with username/password
            grant_type: 'password',
            // space-separated list of scopes for which the token is issued
            scope: 'offline_access profile email'
        };

        return this.getAuthFromServer(url, data);
    }

    // try to refresh token
    refreshToken() {
        const url = 'api/token/auth';
        const data = {
            client_id: this.clientId,
            // required when signing up with username/password
            grant_type: 'refresh_token',
            refresh_token: this.getAuth()!.refresh_token,
            // space-separated list of scopes for which the token is issued
            scope: 'offline_access profile email'
        };

        return this.getAuthFromServer(url, data);
    }

    // retrieve the access & refresh tokens from the server
    getAuthFromServer(url: string, data: any) {
        return this.http.post<TokenResponse>(url, data).pipe(
            tap((res) => {
                const token = res && res.token;
                // if the token is there, login has been successful
                if (token) {
                    // store username and jwt token
                    this.setAuth(res);
                    // successful login
                    return true;
                }

                // failed login
                return throwError('Unauthorized');
            }));
    }

    // performs the logout
    logout(): boolean {
        this.setAuth(null);
        return true;
    }

    // Persist auth into localStorage or removes it if a NULL argument is given
    setAuth(auth: TokenResponse | null): boolean {
        if (isPlatformBrowser(this.platformId)) {
            if (auth) {
                localStorage.setItem(
                    this.authKey,
                    JSON.stringify(auth));
            } else {
                localStorage.removeItem(this.authKey);
            }
        }
        return true;
    }

    // Retrieves the auth JSON object (or NULL if none)
    getAuth(): TokenResponse | null {
        if (isPlatformBrowser(this.platformId)) {
            const i = localStorage.getItem(this.authKey);
            if (i) {
                return JSON.parse(i);
            }
        }
        return null;
    }

    // Returns TRUE if the user is logged in, FALSE otherwise.
    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(this.authKey) != null;
        }
        return false;
    }
}
