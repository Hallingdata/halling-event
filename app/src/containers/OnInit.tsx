import React, { Component } from "react"
import { connect } from "react-redux"

import { fetchEvents } from "../actions"

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
    dispatch(fetchEvents())
  },
})

export default connect(null, mapDispatchToProps)(OnInit)
