import {
  getScheduleDatesAfterDateString,
  getFirstThumbnailUrl,
} from "../util/hallingEvent"
import React, { SFC } from "react"
import { Text, List, ListItem, Thumbnail, Body, Left, Right } from "native-base"
import * as R from "ramda"
import { HallingEvent } from "../../../types"
import { NavigationScreenProp } from "react-navigation"

type Props = {
  event: HallingEvent
  navigateToEvent: (event: HallingEvent) => void
}

const EventListRow: SFC<Props> = ({ event, navigateToEvent }) => (
  <ListItem onPress={() => navigateToEvent(event)}>
    <Thumbnail
      square
      size={80}
      source={{ uri: getFirstThumbnailUrl(event.media) }}
    />
    <Body>
      <Text>{event.name}</Text>
      {R.map(
        date => (
          <Text note key={date}>
            {date}
          </Text>
        ),
        getScheduleDatesAfterDateString(new Date(), event)
      )}
    </Body>
    <Right>
      <Text note>{event.address.municipality.name}</Text>
    </Right>
  </ListItem>
)

export default EventListRow
