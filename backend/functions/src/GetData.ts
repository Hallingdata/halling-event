import fetch from "node-fetch"
import * as R from "ramda"
import { firestore } from "firebase-admin"

const toJson = R.composeP(JSON.parse, R.trim, R.invoker(0, "text"))
const getRawDataProd: () => Promise<string> = () =>
  R.composeP(R.trim, R.invoker(0, "text"), fetch)(
    "http://kvaskjer.hallingdal.no/events/json.php?l=no&q=&fd=&td="
  )
const getEvents = R.composeP()
const writeNewEventsAndUpdateOld = R.composeP()

export const GetData = (getRawData: () => Promise<string> = getRawDataProd) => {
  return R.composeP(toJson, getRawDataProd)()
}
