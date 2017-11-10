import EventListRow from "./EventListRow"
import React, { SFC } from "react"
import { Text, List, ListItem } from "native-base"
import * as R from "ramda"

type Props = {
  events: Array<HallingEvent>
}

const EventList: SFC<Props> = ({ events }) => {
  return (
    <List
      dataArray={events}
      renderRow={(event: HallingEvent) => <EventListRow event={event} />}
    />
  )
}

export default EventList
