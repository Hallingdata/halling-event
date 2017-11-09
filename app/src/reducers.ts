import { combineReducers } from "redux"
import { RECEIVE_EVENTS, IS_FETCHING } from "./actions"
import * as R from "ramda"

type State = {
  isFetching: boolean
  items: Array<HallingEvent>
}

const initState: State = {
  isFetching: false,
  items: [],
}

function events(state = initState, action): State {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return {
        ...state,
        items: action.events,
        isFetching: false,
      }
    case IS_FETCHING:
      return {
        ...state,
        isFetching: true,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  events,
})

export default rootReducer
