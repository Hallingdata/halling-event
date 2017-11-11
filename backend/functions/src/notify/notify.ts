import * as R from "ramda"
import { HallingEvent } from "../../../../types"

export type Inject = {
  getEventsStartingThisDate: (date: Date) => PromiseLike<Array<HallingEvent>>
  sendNotificationForEventToTopic: (
    topic: string
  ) => (event: HallingEvent) => PromiseLike<any>
  currentDate: Date
  daysBeforeToNotify: number
}

export const notify = ({
  getEventsStartingThisDate,
  sendNotificationForEventToTopic,
  currentDate,
  daysBeforeToNotify,
}: Inject) =>
  R.composeP(
    R.forEach(sendNotificationForEventToTopic("events")),
    getEventsStartingThisDate
  )(addDays(currentDate, daysBeforeToNotify))

const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
