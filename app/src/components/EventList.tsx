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
  createEventCooperator,
  eventIsScheduledOnDate,
  getScheduledInstancesForEventOnAndAfterDate,
  eventIsOnOrAfterDate,
} from "../util/hallingEvent"
import { addDaysToDate, getStartAndEndOfDate } from "../util/date"

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
  const currentDate = new Date()
  const eventIsToDay = eventIsScheduledOnDate(currentDate)
  const eventIsToMorrow = eventIsScheduledOnDate(addDaysToDate(currentDate, 1))
  const eventIsOnOrAfterToDay = eventIsOnOrAfterDate(currentDate)

  let hasToDayHeader = false
  let hasToMorrowHeader = false
  let hasLaterHeader = false

  return (
    <List
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
      }
      dataArray={R.sort(
        createEventCooperator(currentDate),
        R.filter(eventIsOnOrAfterToDay, events)
      )}
      renderRow={(event: HallingEvent) => {
        const rowItems = []
        let eventIncluded = false
        const markEventAsIncluded = () => (eventIncluded = true)
        if (!hasToDayHeader) {
          hasToDayHeader = true
          rowItems.push(
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
          rowItems.push(
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
          hasToMorrowHeader &&
          !eventIsToMorrow(event)
        ) {
          hasLaterHeader = true
          markEventAsIncluded()
          rowItems.push(
            <View key={`${event.id}-laterHeader`}>
              <ListItem itemHeader style={styles.listHeader}>
                <Text>SENERE</Text>
              </ListItem>
              <EventListRow event={event} navigateToEvent={navigateToEvent} />
            </View>
          )
        }

        if (!eventIncluded) {
          rowItems.push(
            <EventListRow
              key={`${event.id}-bearEvent`}
              event={event}
              navigateToEvent={navigateToEvent}
            />
          )
        }

        return <View key={event.id}>{rowItems.map(item => item)}</View>
      }}
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
