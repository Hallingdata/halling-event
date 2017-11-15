import * as R from "ramda"

export type Inject = {
  getData: () => PromiseLike<any>
  getEventDetails: (id: string) => PromiseLike<any>
  getDateOfLastEntryInDb: () => PromiseLike<Date>
  writeToDatabase: (data: Array<any>) => PromiseLike<any>
}

export const dataToDatabase = async ({
  getData,
  getEventDetails,
  getDateOfLastEntryInDb,
  writeToDatabase,
}: Inject) =>
  R.composeP(
    writeToDatabase,
    collectDetails(getEventDetails),
    collectTimestamp,
    extractEventsEditedOrAddedAfter(await getDateOfLastEntryInDb()),
    getData
  )()

const extractEventsEditedOrAddedAfter = (time: Date) => ({ list }: any) =>
  R.compose(
    R.reduce(
      (acc, key: string) =>
        R.concat(acc, onlyModifiedAfter(time)(list[key].product_list)),
      []
    ),
    R.keys
  )(list)

const onlyModifiedAfter = (after: Date) =>
  R.filter(({ modified }) => new Date(modified).getTime() > after.getTime())

const collectTimestamp = (data: Array<any>) =>
  R.map(item => {
    return {
      ...item,
      modifiedTimestamp: new Date(item.modified).getTime(),
      firstStartTimestamp: getFirstStartFromSchedule(item.schedule).getTime(),
      lastEndTimestamp: getLastEndFromSchedule(item.schedule).getTime(),
    }
  }, data)

const getFirstStartFromSchedule = (schedule: any) => {
  const first = R.has("list")(schedule) ? schedule.list[1] : schedule

  const date: string = first.from_date.date
  const time = R.pathOr("00:00:00", ["from_time", "time"], first)

  return new Date(`${date}T${time}`)
}

const getLastEndFromSchedule = (schedule: any) => {
  const last = R.has("list")(schedule)
    ? schedule.list[R.keys(schedule.list).length]
    : schedule

  const date: string = last.to_date.date
  const time = R.pathOr("23:59:59", ["to_time", "time"], last)

  return new Date(`${date}T${time}`)
}

const collectDetails = (getDetails: (id: string) => PromiseLike<any>) => (
  data: Array<any>
) =>
  Promise.all(
    R.map(
      async item => ({
        ...item,
        details: await getDetails(item.id),
      }),
      data
    )
  )
