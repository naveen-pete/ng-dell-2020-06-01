import { ActionReducerMap } from "@ngrx/store";

import { loadingReducer } from './shared/store/loading.reducer';

export interface State {
  loading: boolean
}

export const appReducer: ActionReducerMap<State> = {
  loading: loadingReducer
};