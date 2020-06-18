import { ActionReducerMap } from "@ngrx/store";

import { loadingReducer } from '../shared/store/loading.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  loading: boolean,
  auth: fromAuth.State
}

export const appReducers: ActionReducerMap<AppState> = {
  loading: loadingReducer,
  auth: fromAuth.authReducer
};
