import { dataToDatabase, Inject } from "./dataToDatabase"
import { response } from "./dataToDatabase.test.data"
import * as R from "ramda"

test("When date of last entry in DB is '0' all events should be retruned", async () => {
  const inject: Inject = {
    getData: () => Promise.resolve(JSON.parse(R.trim(response))),
    getDateOfLastEntryInDb: () => Promise.resolve(new Date(0)),
    writeToDatabase: (data: Array<any>) =>
      Promise.resolve({
        numberOfNewEvents: data.length,
      }),
  }

  const data = await dataToDatabase(inject)
  expect(data.numberOfNewEvents).toBe(10)
})

test("When date of last event is '2017-11-01T10:29:03' only three events should be returned", async () => {
  const inject: Inject = {
    getData: () => Promise.resolve(JSON.parse(R.trim(response))),
    getDateOfLastEntryInDb: () =>
      Promise.resolve(new Date("2017-11-01T10:29:03")),
    writeToDatabase: (data: Array<any>) =>
      Promise.resolve({
        numberOfNewEvents: data.length,
      }),
  }

  const data = await dataToDatabase(inject)
  expect(data.numberOfNewEvents).toBe(3)
})
