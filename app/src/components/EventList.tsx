import EventListRow from "./EventListRow"
import React, { SFC } from "react"
import { Text, List, ListItem, Separator, View } from "native-base"
import * as R from "ramda"
import { RefreshControl } from "react-native"
import { HallingEvent } from "../../../types"
import { __ } from "ramda"
import { StyleSheet } from "react-native"

type Props = {
  events: Array<HallingEvent>
  refresh: () => void
  isRefreshing: boolean
}

const EventList: SFC<Props> = ({ events, refresh, isRefreshing }) => {
  const eventIsToDay = eventIsOnDate(new Date())
  const eventIsToMorrow = eventIsOnDate(addDaysToDate(new Date(), 1))

  let hasToDayHeader = false
  let hasToMorrowHeader = false
  let hasLaterHeader = false

  return (
    <List
      dataArray={events}
      renderRow={(event: HallingEvent) => {
        const items = []
        let eventIncluded = false
        const markEventAsIncluded = () => (eventIncluded = true)

        if (!hasToDayHeader) {
          hasToDayHeader = true
          items.push(
            <View key={`${event.id}-toDayHeader`}>
              <ListItem itemHeader style={styles.listHeader}>
                <Text>I DAG</Text>
              </ListItem>
              {eventIsToDay(event) ? (
                (markEventAsIncluded(), <EventListRow event={event} />)
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
                (markEventAsIncluded(), <EventListRow event={event} />)
              ) : (
                <ListItem>
                  <Text>Det er ingen planlagte arrangement i morgen</Text>
                </ListItem>
              )}
            </View>
          )
        }

        if (
          !hasLaterHeader &&
          hasToDayHeader &&
          hasToMorrowHeader &&
          eventIsToMorrow(event)
        ) {
          hasLaterHeader = true
          markEventAsIncluded()
          items.push(
            <View key={`${event.id}-laterHeader`}>
              <ListItem itemHeader style={styles.listHeader}>
                <Text>SENERE</Text>
              </ListItem>
              <EventListRow event={event} />
            </View>
          )
        }

        if (!eventIncluded) {
          items.push(
            <EventListRow key={`${event.id}-bearEvent`} event={event} />
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

function getStartAndEndOfDay(date: Date) {
  date.setHours(0, 0, 0)
  const startOfDay = date.getTime()
  date.setHours(23, 59, 59, 59)
  const endOfDay = date.getTime()
  return {
    startOfDay,
    endOfDay,
  }
}

const eventIsOnDate = (date: Date) => (event: HallingEvent) => {
  const { startOfDay, endOfDay } = getStartAndEndOfDay(date)

  return (
    event.firstStartTimestamp < endOfDay && event.lastEndTimestamp > startOfDay
  )
}

const addDaysToDate = (dateIn: Date, days: number): Date => {
  const date = new Date(dateIn.getTime())
  date.setDate(date.getDate() + days)
  return date
}
