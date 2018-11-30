import State from './state';
import { Action, ActionType } from './actions';

export type AppReducer = (state: State, action: Action) => State;

export default function (state: State, action: Action): State {
  switch (action.type) {
    case ActionType.PING:
      return { ...state, startTime: action.value };
    case ActionType.PONG:
      const newState = { ...state };
      delete newState.startTime;

      if (!newState.results) { newState.results = []; }
      newState.results.push(action.value);

      return newState;
    case ActionType.OVERWRITE_STATE:
      return action.value;
    default:
      return state;
  }
}