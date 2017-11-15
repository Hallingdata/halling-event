import EventListRow from "./EventListRow"
import React, { SFC } from "react"
import { Text, List, ListItem, Separator, View } from "native-base"
import * as R from "ramda"
import { RefreshControl } from "react-native"
import { HallingEvent } from "../../../types"
import { __ } from "ramda"
import { StyleSheet } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import {
  eventIsOnDate,
  getScheduledInstancesAfterDate,
} from "../util/hallingEvent"
import { addDaysToDate } from "../util/date"

type Props = {
  events: Array<HallingEvent>
  refresh: () => void
  isRefreshing: boolean
  navigateToEvent: (event: HallingEvent) => void
}

const EventList: SFC<Props> = ({
  events,
  refresh,
  isRefreshing,
  navigateToEvent,
}) => {
  const eventIsToDay = eventIsOnDate(new Date())
  const eventIsToMorrow = eventIsOnDate(addDaysToDate(new Date(), 1))

  let hasToDayHeader = false
  let hasToMorrowHeader = false
  let hasLaterHeader = false

  events.forEach(({id}) => console.log("id: " + id))

  const compareEvents = (a: HallingEvent, b: HallingEvent) => {
    const dateNow = new Date()
    const aNextEvent = getScheduledInstancesAfterDate(dateNow, a)
    const bNextEvent = getScheduledInstancesAfterDate(dateNow, b)

    if (aNextEvent.length === 0) return -1
    if (bNextEvent.length === 0) return 1
    if (aNextEvent[0].from > bNextEvent[0].from) return 1
    if (aNextEvent[0].from < bNextEvent[0].from) return -1
    return 0
  }

  return (
    <List
      dataArray={R.sort(compareEvents, events)}
      renderRow={(event: HallingEvent) => {
        const items = []
        let eventIncluded = false
        const markEventAsIncluded = () => eventIncluded = true
        console.log(event.id)
        if (!hasToDayHeader) {
          hasToDayHeader = true
          items.push(
            <View key={`${event.id}-toDayHeader`}>
              <ListItem itemHeader style={styles.listHeader}>
                <Text>I DAG</Text>
              </ListItem>
              {eventIsToDay(event) ? (
                (markEventAsIncluded(),
                (
                  <EventListRow
                    event={event}
                    navigateToEvent={navigateToEvent}
                  />
                ))
              ) : (
                <ListItem>
                  <Text note>Det er ingen planlagte arrangement i dag</Text>
                </ListItem>
              )}
            </View>
          )
        }

        if (!eventIsToDay(event) && !hasToMorrowHeader) {
          hasToMorrowHeader = true
          items.push(
            <View key={`${event.id}-toMorrowHeader`}>
              <ListItem itemHeader style={styles.listHeader}>
                <Text>I MORGEN</Text>
              </ListItem>
              {eventIsToMorrow(event) ? (
                (markEventAsIncluded(),
                (
                  <EventListRow
                    event={event}
                    navigateToEvent={navigateToEvent}
                  />
                ))
              ) : (
                <ListItem>
                  <Text>Det er ingen planlagte arrangement i morgen</Text>
                </ListItem>
              )}
            </View>
          )
        }

        if (
          !eventIncluded &&
          !hasLaterHeader &&
          hasToDayHeader &&
          hasToMorrowHeader
        ) {
          hasLaterHeader = true
          markEventAsIncluded()
          items.push(
            <View key={`${event.id}-laterHeader`}>
              <ListItem itemHeader style={styles.listHeader}>
                <Text>SENERE</Text>
              </ListItem>
              <EventListRow event={event} navigateToEvent={navigateToEvent} />
            </View>
          )
        }

        if (!eventIncluded) {
          items.push(
            <EventListRow
              key={`${event.id}-bearEvent`}
              event={event}
              navigateToEvent={navigateToEvent}
            />
          )
        }

        return <View key={event.id}>{items.map(item => item)}</View>
      }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
      }
    />
  )
}

export default EventList

const styles = StyleSheet.create({
  listHeader: {
    paddingTop: 32,
    paddingBottom: 5,
  },
})
