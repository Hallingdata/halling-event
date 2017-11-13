import React, { Component } from "react"
import { connect } from "react-redux"

import { fetchEvents } from "../actions"
import HomeScreen from "../components/HomeScreen"

const mapStateToProps = state => ({
  events: state.events.items,
  isFetching: state.events.isFetching,
})

const mapDispatchToProps = dispatch => ({
  fetchEvents() {
    dispatch(fetchEvents())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
