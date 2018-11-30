import State from './state';

export enum ActionType {
  PING = 'ping',
  PONG = 'pong',
  OVERWRITE_STATE = 'overwrite_state'
}

interface PingAction {
  type: ActionType.PING;
  value: number;
}

interface PongAction {
  type: ActionType.PONG;
  value: number;
}

interface OverwriteStateAction {
  type: ActionType.OVERWRITE_STATE;
  value: State;
}

export type Action = PingAction | PongAction | OverwriteStateAction;

export function ping(): PingAction {
  return {
    type: ActionType.PING,
    value: (new Date()).valueOf()
  };
}

export function pong(start: number): PongAction {
  return {
    type: ActionType.PONG,
    value: (new Date()).valueOf() - start
  };
}

export function overwriteState(state: State): OverwriteStateAction {
  return {
    type: ActionType.OVERWRITE_STATE,
    value: state
  };
}