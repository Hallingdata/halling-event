import React, { SFC } from "react"
import { NavigationScreenProp } from "react-navigation"

import EventScreen from "../components/EventScreen"

type Props = {
  navigation: NavigationScreenProp<any, any>
}

export default function({ navigation }) {
  return <EventScreen event={navigation.state.params.event} />
}
