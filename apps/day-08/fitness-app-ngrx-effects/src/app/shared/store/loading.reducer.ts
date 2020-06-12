import * as LoadingActions from './loading.actions';

const initialState = false;

export function loadingReducer(
  state = initialState,
  action: LoadingActions.Actions
): boolean {
  switch (action.type) {
    case LoadingActions.START_LOADING:
      return true;

    case LoadingActions.STOP_LOADING:
      return false;

    default:
      return state;
  }
}
