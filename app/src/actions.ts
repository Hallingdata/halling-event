import firebase from "react-native-firebase"
import * as R from "ramda"

const eventsRef = (firebase as any).firestore().collection("events")

export const RECEIVE_EVENTS = "RECEIVE_EVENTS"
export const IS_FETCHING = "IS_FETCHING"

export const receiveEvents = events => {
  return {
    type: RECEIVE_EVENTS,
    events: events,
  }
}

export const isFetching = () => {
  return {
    type: IS_FETCHING,
  }
}

export const fetchEvents = () => dispatch => {
  dispatch(isFetching())
  return eventsRef
    .orderBy("firstStartTimestamp")
    .get()
    .then(res => dispatch(receiveEvents(filterFinishedEvents(res._docs))))
}

const filterFinishedEvents = R.reduce((acc, { _data }) => {
  //if (_data.lastEndTimestamp > new Date().getTime()) {
    return R.append(_data, acc)
 // }
}, [])
