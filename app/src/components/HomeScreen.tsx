import { Container } from "native-base"
import React, { Component } from "react"

import { HallingEvent } from "../../../types"
import { fetchEvents } from "../actions"
import EventList from "./EventList"

type Props = {
  events: Array<HallingEvent>
  fetchEvents: () => void
  isFetching: boolean
}
type State = {}

class HomeScreen extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { fetchEvents } = this.props
    fetchEvents()
  }

  render() {
    const { events, isFetching, fetchEvents } = this.props
    return (
      <Container>
        <EventList
          events={events}
          refresh={() => fetchEvents()}
          isRefreshing={isFetching}
        />
      </Container>
    )
  }
}
export default HomeScreen
