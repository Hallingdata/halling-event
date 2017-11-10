import EventListRow from "./EventListRow"
import React, { SFC } from "react"
import { Text, List, ListItem, Separator, View } from "native-base"
import * as R from "ramda"
import { RefreshControl } from "react-native"

type Props = {
  events: Array<HallingEvent>
  refresh: () => void
  isRefreshing: boolean
}

const EventList: SFC<Props> = ({ events, refresh, isRefreshing }) => {
  const eventIsToDay = eventIsOnDate(new Date())
  let hasToDayHeader = false
  let hasLaterHeader = false
  return (
    <List
      dataArray={events}
      renderRow={(event: HallingEvent) => {
        if (eventIsToDay(event)) {
          if (!hasToDayHeader) {
            hasToDayHeader = true
            return (
              <View>
                <Separator bordered>
                  <Text>I DAG</Text>
                </Separator>
                <EventListRow event={event} />
              </View>
            )
          }
        } else if (!hasLaterHeader) {
          hasLaterHeader = true
          return (
            <View>
              <Separator bordered>
                <Text>SENERE</Text>
              </Separator>
              <EventListRow event={event} />
            </View>
          )
        }
        return <EventListRow event={event} />
      }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
      }
    />
  )
}

export default EventList

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
