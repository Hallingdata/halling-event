import { getStartAndEndOfDate, isOnSameDate } from "./date"
import { HallingEvent } from "../../../types"
import * as R from "ramda"

/**
 * Date means start of date - 03.07.1988 is 03.07.1988T00:00:00
 */

export const getFirstThumbnailUrl: (any) => string = media => {
  const image = R.has("list")(media) ? media.list[1] : media
  return R.pathOr(
    "http://icons.iconarchive.com/icons/iconsmind/outline/256/Smile-icon.png",
    ["thumbnail", "url"],
    image
  ) as string
}

export const getScheduleDatesAfterDateAsString = (
  date: Date,
  { schedule }: HallingEvent
): Array<string> => {
  const isList = R.has("list")(schedule)
  const startOfDay = getStartAndEndOfDate(date).startOfDay

  if (isList) {
    return R.map(listKey => {
      const fromDate = schedule.list[listKey].from_date.date_formatted
      const toDate = schedule.list[listKey].to_date.date_formatted
      return fromDate === toDate ? fromDate : `${fromDate} - ${toDate}`
    }, R.filter(key => new Date(schedule.list[key].to_date.date).getTime() > startOfDay, R.keys(schedule.list)))
  } else {
    const fromDate = schedule.from_date.date_formatted
    const toDate = schedule.to_date.date_formatted
    return [fromDate === toDate ? fromDate : `${fromDate} - ${toDate}`]
  }
}

export const getLargeImageUrls = (
  event: HallingEvent
): Array<string | undefined> => {
  const getUrlsFromEventMediaList = mediaList =>
    R.map((key: string) => getUrlFromMedia(event.media.list[key]))(
      R.keys(mediaList)
    )
  const getUrlFromMedia: (any) => any = media =>
    R.pathOr(undefined, ["large", "url"], media)

  return R.has("list")(event.media)
    ? getUrlsFromEventMediaList(event.media.list)
    : [getUrlFromMedia(event.media)]
}

export const eventIsScheduledOnDate = (date: Date) => (event: HallingEvent) => {
  const isOnDate = isOnSameDate(date)
  return (
    R.findIndex(
      scheduledInstance =>
        (scheduledInstance.from < date && scheduledInstance.to > date) ||
        isOnDate(scheduledInstance.from) ||
        isOnDate(scheduledInstance.to),
      getScheduledInstancesForEvent(event)
    ) != -1
  )
}

export type ScheduledInstance = {
  from: Date
  to: Date
}

export const getScheduledInstancesForEvent = ({
  schedule,
}: HallingEvent): Array<ScheduledInstance> => {
  const isList = R.has("list")(schedule)
  if (isList) {
    return R.map(
      listKey => getScheduleInstance(schedule.list[listKey]),
      R.keys(schedule.list)
    )
  } else {
    return [getScheduleInstance(schedule)]
  }
}

export const getScheduledInstancesForEventOnAndAfterDate = (
  date: Date,
  event: HallingEvent
) => {
  const instances = getScheduledInstancesForEvent(event)
  return R.filter(
    instance =>
      date.toDateString() === new Date(instance.from).toDateString() ||
      instance.to.getTime() > date.getTime(),
    //  The code above is actually not totally correct, but it works "most of the time". TODO: should be fixed
    instances
  )
  /*
  const startOfDate = getStartAndEndOfDate(date).startOfDay
  const instances = getScheduledInstancesForEvent(event)
  return R.filter(instance => instance.to.getTime() > startOfDate, instances)
  */
}

const getScheduleInstance = (item: any) => {
  const from = {
    date: item.from_date.date,
    time: R.pathOr("00:00:00", ["from_time", "time"], item),
  }
  const to = {
    date: item.to_date.date,
    time: R.pathOr("23:59:59", ["to_time", "time"], item),
  }
  return {
    from: new Date(`${from.date}T${from.time}`),
    to: new Date(`${to.date}T${to.time}`),
  }
}

export const createEventCooperator = (currentDate: Date) => (
  a: HallingEvent,
  b: HallingEvent
) => {
  const aNextEvent = getScheduledInstancesForEventOnAndAfterDate(currentDate, a)
  const bNextEvent = getScheduledInstancesForEventOnAndAfterDate(currentDate, b)

  if (aNextEvent.length === 0) return -1
  if (bNextEvent.length === 0) return 1
  if (aNextEvent[0].from > bNextEvent[0].from) return 1
  if (aNextEvent[0].from < bNextEvent[0].from) return -1
  return 0
}

export const eventIsOnOrAfterDate = (date: Date) => (event: HallingEvent) => {
  return (
    date.toDateString() === new Date(event.lastEndTimestamp).toDateString() ||
    event.lastEndTimestamp > date.getTime()
  )
}
