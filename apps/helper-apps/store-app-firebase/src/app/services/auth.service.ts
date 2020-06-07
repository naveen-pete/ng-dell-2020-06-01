import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from '../models/auth-data';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  signup(authData: AuthData) {
    return this.http.post(`${environment.authApiUrl}:signUp?key=${environment.firebaseApiKey}`, authData);
  }

  login(authData: AuthData) {
    return this.http.post(`${environment.authApiUrl}:signInWithPassword?key=${environment.firebaseApiKey}`, authData);
  }
}