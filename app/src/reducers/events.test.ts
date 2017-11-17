import { REPLACE_EVENTS } from "../constants/events"
import { dummyEvents } from "../../test/eventData"
import * as R from "ramda"
import { events, State } from "./events"
import { HallingEvent } from "../../../types"

describe("ReplaceEvents", async () => {
  let newState
  const state: State = {
    isFetching: false,
    items: [dummyEvents[0]],
  }

  beforeAll(() => {
    newState = events(state, {
      type: REPLACE_EVENTS,
      events: R.slice(2, 4, dummyEvents),
    })
  })

  it("is should have 4 events", () => {
    expect(newState.items).toHaveLength(2)
  })
})
