import * as Actions from './current-exercise.actions';

import { Exercise } from '../exercise.model';

const initialState: Exercise = null;

export function currentExerciseReducer(
  state = initialState,
  action: Actions.CurrentExerciseActions
): Exercise | null {

  switch (action.type) {
    case Actions.SET_CURRENT_EXERCISE:
      return {
        ...action.payload
      };

    case Actions.CLEAR_CURRENT_EXERCISE:
      return null;

    default:
      return state;
  }

}
