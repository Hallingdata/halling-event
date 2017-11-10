import { Container } from "native-base"
import React, { Component } from "react"
import { NavigationScreenProp } from "react-navigation"
import { connect } from "react-redux"
import { Dispatch } from "redux"

import { fetchEvents } from "../actions"
import EventList from "../components/EventList"

type Props = {
  navigation: NavigationScreenProp<any, any>
  dispatch: Dispatch<any>
  events: Array<HallingEvent>
}
type State = {}

class HomeScreen extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchEvents())
  }

  render() {
    const { events } = this.props
    return (
      <Container>
        <EventList events={events} />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    events: state.events.items,
  }
}

export default connect(mapStateToProps)(HomeScreen)
