import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenResponse } from '../_models/token-response';
import { isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  authKey = 'auth';
  clientId = 'TestMaker';

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any) { }

  // performs the login
  login(username: string, password: string) {
    const url = 'api/token/auth';
    const data = {
      username: username,
      password: password,
      client_id: this.clientId,
      // required when signing up wih username/password
      grant_type: 'password',
      // space-separated list of scopes for which the token is issued
      scope: 'offline_access profile email'
    };

    return this.http.post<TokenResponse>(url, data).pipe(
      map((res: any) => {
        const token = res && res.token;
        // if the token is there, login has been successful
        if (token) {
          // store username & jwt token
          this.setAuth(res);
          // successful login
          return true;
        }

        // failed login
        return Observable.throw('Unauthorized');
      })
    );

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

  // return TRUE if the user is logged in, FALSE otherwise
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.authKey) != null;
    }
    return false;
  }
}
