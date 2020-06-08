import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { AuthResponseData } from './auth-response-data.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  private isAuthenticated: boolean = false;

  authChange = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient) { }

  registerUser(authData: AuthData) {
    this.http.post<AuthResponseData>(`${environment.authApiUrl}:signUp?key=${environment.firebaseApiKey}`, authData)
      .subscribe(
        responseData => {
          console.log('Register user successful.');
          console.log('responseData:', responseData);

          this.isAuthenticated = true;
          this.authChange.next(true);
          // this.router.navigate(['/training']);
        },
        error => {
          console.log('Register user failed.');
          console.log('Error:', error.message);
        }
      );
  }

  login(authData: AuthData) {
    this.http.post<AuthResponseData>(`${environment.authApiUrl}:signInWithPassword?key=${environment.firebaseApiKey}`, authData)
      .subscribe(
        responseData => {
          console.log('Login successful.');
          console.log('responseData:', responseData);

          this.isAuthenticated = true;
          this.authChange.next(true);
          // this.router.navigate(['/training']);
        },
        error => {
          console.log('Login failed.');
          console.log('Error:', error.message);
        }
      );
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.isAuthenticated = false;
    this.router.navigate(['/login']);

    console.log('Logout successful.');
  }

  isAuth() {
    return true;
  }

}