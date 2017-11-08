import * as R from "ramda"

export type Inject = {
  getData: () => PromiseLike<any>
  getDateOfLastEntryInDb: () => PromiseLike<Date>
  writeToDatabase: (data: Array<any>) => PromiseLike<any>
}

export const dataToDatabase = async ({
  getData,
  getDateOfLastEntryInDb,
  writeToDatabase,
}: Inject) =>
  R.composeP(
    writeToDatabase,
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
