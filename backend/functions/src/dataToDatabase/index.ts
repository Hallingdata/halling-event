import * as fireAdmin from "firebase-admin"
import fetch from "node-fetch"
import * as R from "ramda"

import { dataToDatabase, Inject } from "./dataToDatabase"
import scrapEvents from "../scrapEvent"

const db = fireAdmin.firestore()
const getLastModificationTimeFromDb = db
  .collection("events")
  .orderBy("modifiedTimestamp")
  .limit(1)
  .select("modifiedTimestamp")
  .get()

const inject: Inject = {
  getData: () =>
    R.composeP(JSON.parse, R.trim, R.invoker(0, "text"), fetch)(
      "http://kvaskjer.hallingdal.no/events/json.php"
    ),
  getDateOfLastEntryInDb: R.composeP(
    (time: number) => new Date(time),
    R.prop("modifiedTimestamp"),
    res =>
      res.docs.length <= 0 ? { modifiedTimestamp: 0 } : res.docs[0].data(),
    () => getLastModificationTimeFromDb
  ),
  getEventDetails: scrapEvents,
  writeToDatabase: (data: Array<any>) =>
    R.reduce(
      (batch, data) => batch.set(db.collection("events").doc(data.id), data),
      db.batch(),
      data
    ).commit(),
}

export default () => dataToDatabase(inject)
