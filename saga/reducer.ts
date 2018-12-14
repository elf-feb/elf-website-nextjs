import {actionTypes} from './actions'
import { Map, fromJS } from 'immutable'

export const exampleInitialState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  placeholderData: null
}

function reducer (exampleInitialState, action) {
  const state = fromJS(exampleInitialState)
  // console.log(state)
  // debugger

  switch (action.type) {
    // case actionTypes.FAILURE:
    //   return {
    //     ...state,
    //     ...{error: action.error}
    //   }

    case actionTypes.INCREMENT:
      return {
        ...state,
        ...{count: state.count + 1}
      }
      // return state.merge({
      //   count: state.get('count') + 1,
      // })

    case actionTypes.DECREMENT:
      return {
        ...state,
        ...{count: state.count - 1}
      }
      // return state.merge({
      //   count: state.get('count') - 1,
      // })

    case actionTypes.RESET:
      return {
        ...state,
        ...{count: exampleInitialState.count}
      }
      // return state.merge({
      //   count: exampleInitialState.get('count'),
      // })

    // case actionTypes.LOAD_DATA_SUCCESS:
    //   return {
    //     ...state,
    //     ...{placeholderData: action.data}
    //   }

    // case actionTypes.TICK_CLOCK:
    //   return {
    //     ...state,
    //     ...{
    //       lastUpdate: action.ts,
    //       light: !!action.light,
    //     }
    //   }

    default:
      return state
  }
}

export default reducer
