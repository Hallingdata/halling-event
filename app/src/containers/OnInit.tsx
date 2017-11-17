import React, { Component } from "react"
import { connect } from "react-redux"
import { getAllEvents } from "../util/firebase";

import { fetchEvents } from "../actions/events"

type Props = {
  fetchEvents: () => void
}

class OnInit extends Component<Props> {
  constructor(props) {
    super(props)
    props.fetchEvents()
  }

  render() {
    return null
  }
}

const mapDispatchToProps = dispatch => ({
  fetchEvents() {
    dispatch(fetchEvents(getAllEvents))
  },
})

export default connect(null, mapDispatchToProps)(OnInit)
