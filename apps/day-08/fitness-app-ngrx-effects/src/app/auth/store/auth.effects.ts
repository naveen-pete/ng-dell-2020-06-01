import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { AuthResponseData } from '../auth-response-data.model';
import { environment } from '../../../environments/environment';
import { UIService } from 'src/app/shared/ui.service';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

const DEFAULT_TOKEN_EXPIRY_TIME_IN_SEC = 600;

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private uiService: UIService,
    private authService: AuthService
  ) { }

  @Effect()
  signup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((action: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>(
        `${environment.authApiUrl}:signUp?key=${environment.firebaseApiKey}`,
        action.payload
      ).pipe(
        map(this.handleAuthentication),
        catchError(this.handleError)
      );
    })
  );

  @Effect()
  login = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((action: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        `${environment.authApiUrl}:signInWithPassword?key=${environment.firebaseApiKey}`,
        action.payload
      ).pipe(
        map(this.handleAuthentication),
        catchError(this.handleError)
      );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/training']);
    })
  );

  @Effect({ dispatch: false })
  authFailed = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_FAIL),
    tap((action: AuthActions.AuthenticateFail) => {
      this.uiService.showMessage(action.payload);
    })
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.authService.clearLogoutTimer();
      this.router.navigate(['/login']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const dummyAction = { type: 'DUMMY' };

      const userData: {
        id: string;
        email: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return dummyAction;
      }

      const tokenExpirationDate = new Date(userData._tokenExpirationDate);
      const user = new User(
        userData.id,
        userData.email,
        userData._token,
        tokenExpirationDate
      );

      if (user.token) {
        const expirationDuration = tokenExpirationDate.getTime() - Date.now();
        this.authService.setLogoutTimer(expirationDuration);

        return new AuthActions.AuthenticateSuccess(
          userData.id,
          userData.email,
          userData._token,
          tokenExpirationDate
        )
      }

      return dummyAction;

    })
  );

  private handleAuthentication = (responseData: AuthResponseData) => {
    const { localId, email, idToken, expiresIn } = responseData;
    const expiresInMS =
      (expiresIn ? parseInt(expiresIn) : DEFAULT_TOKEN_EXPIRY_TIME_IN_SEC) * 1000;
    const tokenExpirationDate = new Date(Date.now() + expiresInMS);

    const user = new User(
      localId,
      email,
      idToken,
      tokenExpirationDate
    );
    localStorage.setItem('userData', JSON.stringify(user));

    this.authService.setLogoutTimer(expiresInMS);

    return new AuthActions.AuthenticateSuccess(
      localId,
      email,
      idToken,
      tokenExpirationDate
    );
  }

  // NOTE:
  // This error handling is very specific to Firebase API.
  // You will need to implement a similar response within your server-side REST API.
  private handleError(errorResponse: HttpErrorResponse): Observable<AuthActions.AuthenticateFail> {
    let errorMessage = 'An unknown error occurred.';

    if (!errorResponse.error || !errorResponse.error.error) {
      return of(new AuthActions.AuthenticateFail(errorMessage));
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':            // signup error
        errorMessage = 'The email address is already in use by another account.';
        break;

      case 'EMAIL_NOT_FOUND':         // signup error
        errorMessage = 'There is no user record corresponding to this email.';
        break;

      case 'INVALID_PASSWORD':        // login error
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;

      case 'OPERATION_NOT_ALLOWED':   // login error
        errorMessage = 'Password sign-in is disabled.';
        break;

      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.'
        break;
    }

    return of(new AuthActions.AuthenticateFail(errorMessage));
  }

}