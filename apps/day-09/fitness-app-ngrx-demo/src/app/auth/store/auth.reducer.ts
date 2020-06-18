import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  error: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  error: null,
  loading: false
};

export function authReducer(
  state = initialState,
  action: AuthActions.Actions
): State {

  switch (action.type) {
    case AuthActions.SIGNUP_START:
    case AuthActions.LOGIN_START:
      return {
        ...state,
        error: null,
        loading: true
      };

    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.tokenExpirationDate
      );
      return {
        ...state,
        error: null,
        user: user,
        loading: false
      };

    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        error: action.payload,
        loading: false
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }

}
