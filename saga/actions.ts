export const actionTypes = {
  FAILURE: 'FAILURE',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  LOAD_DATA: 'LOAD_DATA',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  START_CLOCK: 'START_CLOCK',
  TICK_CLOCK: 'TICK_CLOCK'
}

export function increment () {
  return {type: actionTypes.INCREMENT}
}

export function decrement () {
  return {type: actionTypes.DECREMENT}
}

export function reset () {
  return {type: actionTypes.RESET}
}

export function startClock () {
  return {type: actionTypes.START_CLOCK}
}

export const tickClock = (isServer: boolean) => ({
  type: actionTypes.TICK_CLOCK,
  light: !isServer,
  ts: Date.now(),
})

export const loadData = () => ({ type: actionTypes.LOAD_DATA })

export const loadDataSuccess = (data: Array<any>) => ({
  type: actionTypes.LOAD_DATA_SUCCESS,
  data,
})

export const failure = (error: boolean) => ({
  type: actionTypes.FAILURE,
  error,
})
