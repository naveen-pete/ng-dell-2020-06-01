import { Action } from '@ngrx/store';

import { Exercise } from '../exercise.model';

export const SET_CURRENT_EXERCISE = '[Training] Set Current Exercise';
export const CLEAR_CURRENT_EXERCISE = '[Training] Clear Current Exercise';

export class SetCurrentExercise implements Action {
  readonly type = SET_CURRENT_EXERCISE

  constructor(public payload: Exercise) { }
}

export class ClearCurrentExercise implements Action {
  readonly type = CLEAR_CURRENT_EXERCISE
}

export type CurrentExerciseActions = SetCurrentExercise | ClearCurrentExercise;
