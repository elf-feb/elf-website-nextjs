import { fromJS } from 'immutable'
import {actionTypes} from './actions'

type Action = {
  type: string,
  light?: boolean,
  ts?: number,
  data?: Array<any>,
  error?: boolean,
}

export const exampleInitialState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  placeholderData: null
}

export default (exampleInitialState, action: Action) => {
  const state = fromJS(exampleInitialState)

  switch (action.type) {
    case actionTypes.INCREMENT:
      return state.merge({
        count: state.get('count') + 1,
      })

    case actionTypes.DECREMENT:
      return state.merge({
        count: state.get('count') - 1,
      })

    case actionTypes.RESET:
      return state.merge({
        count: 0,
      })

    case actionTypes.TICK_CLOCK:
      return state.merge({
        lastUpdate: action.ts,
        light: !!action.light,
      })

    case actionTypes.LOAD_DATA_SUCCESS:
      return state.merge({
        placeholderData: action.data,
      })

    case actionTypes.FAILURE:
      return state.merge({
        error: action.error,
      })

    default:
      return state
  }
}
