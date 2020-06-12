import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app.reducer';
import { Logout } from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logoutTimer: number;

  constructor(
    private store: Store<AppState>
  ) { }

  setLogoutTimer(expirationDuration: number) {
    this.logoutTimer = window.setTimeout(
      () => {
        this.store.dispatch(new Logout());
      },
      expirationDuration
    );
  }

  clearLogoutTimer() {
    if (this.logoutTimer) {
      window.clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }

}