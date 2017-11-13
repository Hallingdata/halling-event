import { Container, H2, Text } from "native-base"
import React, { SFC } from "react"
import { View, Image } from "react-native"
import * as R from "ramda"

import { HallingEvent } from "../../../types"

type Props = {
  event: HallingEvent
}

const EventScreen: SFC<Props> = ({ event }) => (
  <Container>
    <Image
      resizeMode="cover"
      style={{
        height: 290,
        width: null,
      }}
      source={{ uri: getLargeImages(event)[0] }}
    />
    <H2>{event.name}</H2>
    <Text>{event.address.municipality.name}</Text>
  </Container>
)

export default EventScreen

const getLargeImages = (event: HallingEvent): Array<string> => {
  const getUrlsFromEventMediaList = mediaList =>
    R.map((key: string) => getUrlFromMedia(event.media.list[key]))(
      R.keys(mediaList)
    )
  const getUrlFromMedia: (any) => string = media => media.large.url

  return R.has("list")(event.media)
    ? getUrlsFromEventMediaList(event.media.list)
    : [getUrlFromMedia(event.media)]
}
