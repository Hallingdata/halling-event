import { Container, Text } from "native-base"
import React, { SFC } from "react"

import { HallingEvent } from "../../../types"
import { fetchEvents } from "../actions"
import EventList from "./EventList"
import { NavigationScreenProp } from "react-navigation"

type Props = {
  event: HallingEvent
}

const EventScreen: SFC<Props> = ({ event }) => (
  <Container>
    <Text>{event.name}</Text>
  </Container>
)

export default EventScreen
