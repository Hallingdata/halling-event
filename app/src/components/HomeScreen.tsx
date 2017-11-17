import { Container } from "native-base"
import React, { SFC } from "react"

import { HallingEvent } from "../../../types"
import EventList from "./EventList"
import { NavigationScreenProp } from "react-navigation"

type Props = {
  events: Array<HallingEvent>
  fetchEvents: () => void
  isFetching: boolean
  navigateToEvent: (event: HallingEvent) => void
}

const HomeScreen: SFC<Props> = ({
  events,
  isFetching,
  fetchEvents,
  navigateToEvent,
}) => (
  <Container style={{backgroundColor: "#fff"}}>
    <EventList
      events={events}
      navigateToEvent={navigateToEvent}
      refresh={() => fetchEvents()}
      isRefreshing={isFetching}
    />
  </Container>
)

export default HomeScreen
