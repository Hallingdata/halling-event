import * as R from "ramda"

import { dummyEvents } from "../../test/eventData"
import { IS_FETCHING, REPLACE_EVENTS } from "../constants/events"
import { replaceEvents, isFetching, fetchEvents } from "./events"

describe("addEvents", async () => {
  let action
  beforeAll(() => {
    action = replaceEvents(dummyEvents)
  })

  test("it should return action type 'REPLACE_EVENTS'", () => {
    expect(action.type).toBe(REPLACE_EVENTS)
  })

  test("it should return the correct action payload", () => {
    expect(action.events).toEqual(dummyEvents)
  })
})

describe("isFetching", () => {
  let action
  beforeAll(() => {
    action = isFetching()
  })

  test("it should return action type 'IS_FETCHING'", () => {
    expect(action.type).toBe(IS_FETCHING)
  })
})

describe("fetchEvents", () => {
  let action

  const getAllEventsMoc = () => Promise.resolve(dummyEvents)
  const dispatchMoc = jest.fn()
  beforeAll(() => {
    action = fetchEvents(getAllEventsMoc)(dispatchMoc)
  })

  test("it should first dispatch a 'IS_FETCHING' action", () => {
    expect(dispatchMoc.mock.calls[0][0].type).toBe(IS_FETCHING)
  })

  test("it should secondly dispatch a 'REPLACE_EVENTS' action", () => {
    expect(dispatchMoc.mock.calls[1][0].type).toBe(REPLACE_EVENTS)
  })

  test("the second call should include the dummyEvents in the payload", () => {
    expect(dispatchMoc.mock.calls[1][0].events).toEqual(dummyEvents)
  })
})
