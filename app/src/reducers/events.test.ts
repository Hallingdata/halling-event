import * as R from "ramda"
import deepFreeze from "deep-freeze"

import { dummyEvents } from "../../test/eventData"
import { IS_FETCHING, REPLACE_EVENTS } from "../constants/events"
import { events, State } from "./events"

describe("ReplaceEvents", async () => {
  let newState
  const state: State = {
    isFetching: true,
    items: [dummyEvents[0]],
  }

  deepFreeze(state)

  beforeAll(() => {
    newState = events(state, {
      type: REPLACE_EVENTS,
      events: R.slice(2, 4, dummyEvents),
    })
  })

  test("new state should have (the new) 2 events", () => {
    expect(newState.items).toHaveLength(2)
  })

  test("new state should have isFetching false", () => {
    expect(newState.isFetching).toBe(false)
  })
})

describe("IS_FETCHING", async () => {
  let newState
  const state: State = {
    isFetching: false,
    items: [dummyEvents[0]],
  }

  deepFreeze(state)

  beforeAll(() => {
    newState = events(state, {
      type: IS_FETCHING,
    })
  })

  test("new state should have isFetching true", () => {
    expect(newState.isFetching).toBe(true)
  })
})
