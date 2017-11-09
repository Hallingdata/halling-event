import React, { SFC } from "react"
import { Text, List, ListItem } from "native-base"
import * as R from "ramda"

type Props = {
  events: Array<HallingEvent>
}

export const EventList: SFC<Props> = ({ events }) => {
  return (
    <List
      dataArray={events}
      renderRow={(event: HallingEvent) => (
        <ListItem>
          <Text>{event.name}</Text>
        </ListItem>
      )}
    />
  )
}
