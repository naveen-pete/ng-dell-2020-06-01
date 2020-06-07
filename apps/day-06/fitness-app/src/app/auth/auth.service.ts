import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  private isAuthenticated: boolean = false;

  authChange = new Subject<boolean>();

  constructor(private router: Router) { }

  registerUser(authData: AuthData) {
    // ajax request that saves user information on the server
    this.user = {
      email: authData.email,
      userId: Date.now().toString()
    };

    this.authChange.next(true);
    this.isAuthenticated = true;
    this.router.navigate(['/']);

    console.log('Register user successful.');
  }

  login(authData: AuthData) {
    // ajax request that logs the user into the app
    this.user = {
      email: authData.email,
      userId: Date.now().toString()
    };

    this.authChange.next(true);
    this.isAuthenticated = true;
    this.router.navigate(['/training']);

    console.log('Login successful.');
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.isAuthenticated = false;
    this.router.navigate(['/login']);

    console.log('Logout successful.');
  }

  isAuth() {
    return this.isAuthenticated;
  }

}