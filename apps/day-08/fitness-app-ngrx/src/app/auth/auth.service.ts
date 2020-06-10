import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { AuthResponseData } from './auth-response-data.model';
import { environment } from '../../environments/environment';
import { UIService } from '../shared/ui.service';
import { State } from '../app.reducer';
import { StartLoading, StopLoading } from '../shared/store/loading.actions';


const TOKEN_EXPIRATION_TIME_IN_SEC = 600;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private autoLogoutTimer: number;

  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private uiService: UIService,
    private store: Store<State>
  ) { }

  registerUser(authData: AuthData) {
    this.store.dispatch(new StartLoading());

    this.http.post<AuthResponseData>(`${environment.authApiUrl}:signUp?key=${environment.firebaseApiKey}`, authData)
      .pipe(
        catchError(this.handleError),
        tap((responseData: AuthResponseData) => {
          this.handleAuthToken(responseData);
        })
      )
      .subscribe(
        () => {
          this.store.dispatch(new StopLoading());
          this.router.navigate(['/training']);
        },
        error => {
          this.store.dispatch(new StopLoading());
          this.uiService.showMessage(error.message);
        }
      );
  }

  login(authData: AuthData) {
    this.store.dispatch(new StartLoading());
    this.http.post<AuthResponseData>(`${environment.authApiUrl}:signInWithPassword?key=${environment.firebaseApiKey}`, authData)
      .pipe(
        catchError(this.handleError),
        tap((responseData: AuthResponseData) => {
          this.handleAuthToken(responseData);
        })
      )
      .subscribe(
        () => {
          this.store.dispatch(new StopLoading());
          this.router.navigate(['/training']);
        },
        error => {
          this.store.dispatch(new StopLoading());
          this.uiService.showMessage(error.message);
        }
      );
  }

  autoLogin() {
    const userData: {
      id: string;
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const tokenExpirationDate = new Date(userData._tokenExpirationDate);
    const user = new User(
      userData.id,
      userData.email,
      userData._token,
      tokenExpirationDate
    );
    if (user.token) {
      this.user.next(user);
      const expirationDuration = tokenExpirationDate.getTime() - Date.now();
      this.autoLogout(expirationDuration);
    }
  }

  private autoLogout(expirationDuration: number) {
    this.autoLogoutTimer = window.setTimeout(
      () => {
        this.logout();
      },
      expirationDuration
    );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');

    if (this.autoLogoutTimer) {
      window.clearTimeout(this.autoLogoutTimer);
      this.autoLogoutTimer = null;
    }

    this.router.navigate(['/login']);

    console.log('Logout successful.');
  }

  private handleAuthToken(responseData: AuthResponseData) {
    const { localId, email, idToken, expiresIn } = responseData;
    const expiresInMS =
      (expiresIn ? parseInt(expiresIn) : TOKEN_EXPIRATION_TIME_IN_SEC) * 1000;
    const tokenExpirationDate = new Date(Date.now() + expiresInMS);

    const user = new User(
      localId,
      email,
      idToken,
      tokenExpirationDate
    );

    this.user.next(user);
    this.autoLogout(expiresInMS);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // NOTE:
  // This error handling is very specific to Firebase API.
  // You will need to implement a similar response within your server-side REST API.
  private handleError(errorResponse: HttpErrorResponse): Observable<Error> {
    const error = new Error('An unknown error occurred.');

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(error);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':            // signup error
        error.message = 'The email address is already in use by another account.';
        break;

      case 'EMAIL_NOT_FOUND':         // signup error
        error.message = 'There is no user record corresponding to this email.';
        break;

      case 'INVALID_PASSWORD':        // login error
        error.message = 'The password is invalid or the user does not have a password.';
        break;

      case 'OPERATION_NOT_ALLOWED':   // login error
        error.message = 'Password sign-in is disabled.';
        break;

      case 'USER_DISABLED':
        error.message = 'The user account has been disabled by an administrator.'
        break;
    }

    return throwError(error);
  }

}