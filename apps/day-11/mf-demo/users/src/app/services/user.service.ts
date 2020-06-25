import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl).pipe(
      map((response: any) => {
        const users: UserModel[] = response.data.map((u: any) => ({
          id: u.id,
          firstName: u.first_name,
          lastName: u.last_name,
          email: u.email,
        }));
        return users;
      })
    );
  }

  getUser(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/${id}`).pipe(
      map((response: any) => {
        const {
          id,
          first_name: firstName,
          last_name: lastName,
          email,
          avatar,
        } = response.data;
        const user: UserModel = {
          id,
          firstName,
          lastName,
          email,
          avatar,
        };
        return user;
      })
    );
  }
}
