import * as Actions from './loading.actions';

const initialState = false;

export function loadingReducer(state = initialState, action: Actions.UIActions) {
  switch (action.type) {
    case Actions.START_LOADING:
      return true;

    case Actions.STOP_LOADING:
      return false;

    default:
      return state;
  }
}
