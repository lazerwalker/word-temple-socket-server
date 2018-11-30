export default interface State {
  results?: number[];
  startTime?: number; // a Date.valueOf() number of ms
}

export function createState(): State {
  return { };
}