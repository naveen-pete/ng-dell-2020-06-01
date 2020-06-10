import { ActionReducerMap } from "@ngrx/store";

import { User } from './auth/user.model';
import { loadingReducer } from './shared/store/loading.reducer';
import { userReducer } from './auth/store/user.reducer';

export interface State {
  loading: boolean,
  user: User
}

export const appReducer: ActionReducerMap<State> = {
  loading: loadingReducer,
  user: userReducer
};
