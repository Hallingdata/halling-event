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
  isFetching: boolean
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
    const { events, dispatch, isFetching } = this.props
    return (
      <Container>
        <EventList events={events} refresh={() => dispatch(fetchEvents())} isRefreshing={isFetching} />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    events: state.events.items,
    isFetching: state.events.isFetching
  }
}

export default connect(mapStateToProps)(HomeScreen)
