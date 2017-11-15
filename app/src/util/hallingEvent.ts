import { getStartAndEndOfDay, isOnSameDate } from "./date"
import { HallingEvent } from "../../../types"
import * as R from "ramda"

export const getFirstThumbnailUrl: (any) => string = media => {
  const image = R.has("list")(media) ? media.list[1] : media
  return R.pathOr(
    "http://icons.iconarchive.com/icons/iconsmind/outline/256/Smile-icon.png",
    ["thumbnail", "url"],
    image
  ) as string
}

export const getScheduleDatesAfterDateString = (
  date: Date,
  { schedule }: HallingEvent
): Array<string> => {
  const isList = R.has("list")(schedule)
  const startOfDay = getStartAndEndOfDay(date).startOfDay

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

export const eventIsOnDate = (date: Date) => (event: HallingEvent) => {
  const isOnDate = isOnSameDate(date)
  const result = R.findIndex(
      item =>
        (item.from < date && item.to > date) ||
        isOnDate(item.from) ||
        isOnDate(item.to),
      getScheduledEvents(event)
    ) != -1
    console.log("res: " + result)
  return result
}

export type ScheduledInstance = {
  from: Date
  to: Date
}

export const getScheduledEvents = ({
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

export const getScheduledInstancesAfterDate = (date: Date, event: HallingEvent) => {
    const instances = getScheduledEvents(event)
    return R.filter(instance => instance.to > date, instances)
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
