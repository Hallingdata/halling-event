import * as R from "ramda"
import { scrapEvents, Inject } from "./scrapEvent"
import { eventHtml } from "./scrapEvent.test.data"

const inn: Inject = {
  fetchHtml: async (id: string) => eventHtml,
}

const dummyEvents = [
  {
    id: "fakeId",
  },
]

test("test html traverser", async () => {
  const res = await scrapEvents(inn)(dummyEvents as any)

  console.log(JSON.stringify(res, null, " "))
})
