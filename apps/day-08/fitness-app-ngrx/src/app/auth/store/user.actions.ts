import { Action } from '@ngrx/store';

export const SET_USER = '[Auth] Set User';
export const CLEAR_USER = '[Auth] Clear User';

interface User {
  id: string;
  email: string;
  token: string;
  tokenExpirationDate: Date;
}

export class SetUser implements Action {
  readonly type = SET_USER;
  readonly payload: User

  constructor(id: string, email: string, token: string, tokenExpirationDate: Date) {
    this.payload = {
      id,
      email,
      token,
      tokenExpirationDate
    }
  }
}

export class ClearUser implements Action {
  readonly type = CLEAR_USER;
}

export type UserActions = SetUser | ClearUser;
