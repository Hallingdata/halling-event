import { Container, H2, Text } from "native-base"
import React, { SFC } from "react"
import { View, Image } from "react-native"
import * as R from "ramda"
import { getLargeImageUrls } from "../util/hallingEvent";

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
      source={{ uri: getLargeImageUrls(event)[0] }}
    />
    <H2>{event.name}</H2>
    <Text>{event.details.Beskrivelse}</Text>
  </Container>
)

export default EventScreen


