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

    console.log('User registered successfully.');
  }

  login(authData: AuthData) {
    // ajax request that logs the user into the app
    this.user = {
      email: authData.email,
      userId: Date.now().toString()
    };

    this.authChange.next(true);

    console.log('User logged in successfully.');
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
  }

  isAuth() {
    return this.user != null;
  }

}