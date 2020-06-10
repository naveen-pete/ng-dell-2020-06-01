import { User } from "../user.model";
import * as Actions from "./user.actions";

const initialState: User = null;

export function userReducer(state: User = initialState, action: Actions.UserActions): User | null {
  switch (action.type) {
    case Actions.SET_USER:
      const { id, email, token, tokenExpirationDate } = action.payload;
      const user = new User(
        id,
        email,
        token,
        tokenExpirationDate
      );
      return user;

    case Actions.CLEAR_USER:
      return null;

    default:
      return state;
  }
}
