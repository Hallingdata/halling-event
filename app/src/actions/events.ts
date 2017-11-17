import * as R from "ramda"
import { REPLACE_EVENTS, IS_FETCHING } from "../constants/events"
import { HallingEvent } from "../../../types"

export const replaceEvents = events => {
  return {
    type: REPLACE_EVENTS,
    events: events,
  }
}

export const isFetching = () => {
  return {
    type: IS_FETCHING,
  }
}

export const fetchEvents = (
  getAllEvents: () => Promise<Array<HallingEvent>>
) => async dispatch => {
  dispatch(isFetching())
  const allEvents = await getAllEvents()
  dispatch(replaceEvents(allEvents))
}
