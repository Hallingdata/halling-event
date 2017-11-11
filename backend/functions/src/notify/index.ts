import * as console from "console"
import * as fireAdmin from "firebase-admin"
import fetch from "node-fetch"
import * as R from "ramda"
import { HallingEvent } from "../../../../types"

import { notify, Inject } from "./notify"

const messaging = fireAdmin.messaging()
const db = fireAdmin.firestore()
const eventsRef = db.collection("events")

const inject: Inject = {
  getEventsStartingThisDate: (date: Date) =>
    eventsRef
      .where("firstStartTimestamp", ">", getStartOfDayTimestamp(date))
      .where("firstStartTimestamp", "<", getEndOfDayTimestamp(date))
      .get()
      .then(res => R.map(doc => doc.data() as HallingEvent, res.docs)),
  sendNotificationForEventToTopic: (topic: string) => ({
    name,
    address,
  }: HallingEvent) => {
    console.log("send notification for event: " + name + ", to topic: " + topic)
    return messaging
      .sendToTopic(topic, {
        notification: {
          title: name,
          body: address.municipality.name,
        },
        data: {
          municipality: address.municipality.name,
          name,
        },
      } as any)
      .then(function(response) {
        console.log("Successfully sent message:", response)
      })
      .catch(function(error) {
        console.log("Error sending message:", error)
      })
  },
  currentDate: new Date(),
  daysBeforeToNotify: 1,
}

export default () => notify(inject)

const getStartOfDayTimestamp = (dateIn: Date) => {
  const date = new Date(dateIn.getTime())
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

const getEndOfDayTimestamp = (dateIn: Date) => {
  const date = new Date(dateIn.getTime())
  date.setHours(23, 59, 59, 59)
  return date.getTime()
}
