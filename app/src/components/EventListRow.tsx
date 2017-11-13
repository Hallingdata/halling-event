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
      source={{ uri: getFirstThumbnail(event.media) }}
    />
    <Body>
      <Text>{event.name}</Text>
      <Text note>{getDates(event)}</Text>
    </Body>
    <Right>
      <Text note>{event.address.municipality.name}</Text>
    </Right>
  </ListItem>
)

export default EventListRow

const getFirstThumbnail: (any) => string = media => {
  const image = R.has("list")(media) ? media.list[1] : media
  return R.pathOr(
    "http://icons.iconarchive.com/icons/iconsmind/outline/256/Smile-icon.png",
    ["thumbnail", "url"],
    image
  ) as string
}

const getDates = (event): string => {
  const start = getStartDate(event)
  const end = getEndDate(event)
  return start === end ? start : `${start} - ${end}`
}

const getStartDate = ({ schedule }: HallingEvent): string => {
  const first = R.has("list")(schedule) ? schedule.list[1] : schedule

  return first.from_date.date_formatted
}

const getEndDate = ({ schedule }: HallingEvent): string => {
  const last = R.has("list")(schedule)
    ? schedule.list[R.keys(schedule.list).length]
    : schedule

  return last.to_date.date_formatted
}
