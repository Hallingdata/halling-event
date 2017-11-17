import { HallingEvent } from "../../../types"
import { IS_FETCHING, REPLACE_EVENTS } from '../constants/events';

export type State = {
  isFetching: boolean
  items: Array<HallingEvent>
}

const initState: State = {
  isFetching: false,
  items: [],
}

export function events(state = initState, action): State {
  switch (action.type) {
    case REPLACE_EVENTS:
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
