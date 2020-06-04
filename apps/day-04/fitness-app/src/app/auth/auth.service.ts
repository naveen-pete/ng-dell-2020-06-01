import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;

  authChange = new Subject<boolean>();

  registerUser(authData: AuthData) {
    // ajax request that saves user information on the server
    this.user = {
      email: authData.email,
      userId: Date.now().toString()
    };

    this.authChange.next(true);

    console.log('Register user successful.');
  }

  login(authData: AuthData) {
    // ajax request that logs the user into the app
    this.user = {
      email: authData.email,
      userId: Date.now().toString()
    };

    this.authChange.next(true);

    console.log('Login successful.');
  }

  logout() {
    this.user = null;
    this.authChange.next(false);

    console.log('Logout successful.');
  }

  isAuth() {
    return this.user != null;
  }

}