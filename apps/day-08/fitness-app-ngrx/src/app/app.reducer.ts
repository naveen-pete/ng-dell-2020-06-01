import { ActionReducerMap } from "@ngrx/store";

import { User } from './auth/user.model';
import { Exercise } from './training/exercise.model';

import { loadingReducer } from './shared/store/loading.reducer';
import { userReducer } from './auth/store/user.reducer';
import { currentExerciseReducer } from './training/store/current-exercise.reducer';

export interface State {
  loading: boolean,
  user: User,
  currentExercise: Exercise
}

export const appReducer: ActionReducerMap<State> = {
  loading: loadingReducer,
  user: userReducer,
  currentExercise: currentExerciseReducer
};
