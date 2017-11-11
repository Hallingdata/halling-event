import { IS_FETCHING, RECEIVE_EVENTS } from "../actions"

import { HallingEvent } from "../../../types"

type State = {
  isFetching: boolean
  items: Array<HallingEvent>
}

const initState: State = {
  isFetching: false,
  items: [],
}

export function events(state = initState, action): State {
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

export default events
