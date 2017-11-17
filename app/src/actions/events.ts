import * as R from "ramda"
import { REPLACE_EVENTS, IS_FETCHING } from "../constants/events"
import { HallingEvent } from "../../../types"

export const addEvents = events => {
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
  getAllEvents: () => Promise<HallingEvent>
) => async dispatch => {
  dispatch(isFetching())
  const allEvents = await getAllEvents()
  dispatch(addEvents(allEvents))
}
