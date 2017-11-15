import { Container, H2, Text, Content, Card, CardItem } from "native-base"
import React, { SFC } from "react"
import { View, Image } from "react-native"
import * as R from "ramda"
import { getLargeImageUrls } from "../util/hallingEvent"

import { HallingEvent } from "../../../types"

type Props = {
  event: HallingEvent
}

const EventScreen: SFC<Props> = ({ event }) => (
  <Container>
    <Content>
      <Card>
          <Image
            resizeMode="cover"
            style={{
              height: 290,
              width: null,
            }}
            source={{ uri: getLargeImageUrls(event)[0] }}
          />
        <CardItem>
          <H2>{event.name}</H2>
        </CardItem>
        <CardItem cardBody>
          <Text>{event.details.Beskrivelse}</Text>
        </CardItem>
        <CardItem >
          <Text>{event.details["Tid og sted"]}</Text>
        </CardItem>
      </Card>
    </Content>
  </Container>
)

export default EventScreen
