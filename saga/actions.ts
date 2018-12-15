export const actionTypes = {
  RESET: 'RESET',
  FAILURE: 'FAILURE',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  LOAD_DATA: 'LOAD_DATA',
  TICK_CLOCK: 'TICK_CLOCK',
  START_CLOCK: 'START_CLOCK',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
}

export const reset = () => ({type: actionTypes.RESET})
export const loadData = () => ({ type: actionTypes.LOAD_DATA })
export const increment = () => ({type: actionTypes.INCREMENT})
export const decrement = () => ({type: actionTypes.DECREMENT})

export const tickClock = (isServer: boolean) => ({
  type: actionTypes.TICK_CLOCK,
  light: !isServer,
  ts: Date.now(),
})

export const loadDataSuccess = (data: Array<any>) => ({
  type: actionTypes.LOAD_DATA_SUCCESS,
  data,
})

export const failure = (error: any) => ({
  type: actionTypes.FAILURE,
  error,
})

export const startClock = () => ({
  type: actionTypes.START_CLOCK,
})
