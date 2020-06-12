import { ActionReducerMap } from "@ngrx/store";

import { Exercise } from '../training/exercise.model';
import { loadingReducer } from '../shared/store/loading.reducer';
import { currentExerciseReducer } from '../training/store/current-exercise.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  loading: boolean,
  currentExercise: Exercise
  auth: fromAuth.State,
}

export const appReducers: ActionReducerMap<AppState> = {
  loading: loadingReducer,
  currentExercise: currentExerciseReducer,
  auth: fromAuth.authReducer
};
