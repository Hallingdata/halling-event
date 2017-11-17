import firebase from "react-native-firebase"
import * as R from "ramda";

const eventsRef = (firebase as any).firestore().collection("events")
export const getAllEvents = () =>
  eventsRef
    .orderBy("firstStartTimestamp")
    .get()
    .then(res => R.map(({ _data }) => _data, res._docs))
