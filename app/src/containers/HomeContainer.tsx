import { getAllEvents } from '../util/firebase';
import React, { Component } from "react"
import { connect } from "react-redux"
import * as R from 'ramda';

import { fetchEvents } from "../actions/events"
import HomeScreen from "../components/HomeScreen"
import { HallingEvent } from "../../../types"


const mapStateToProps = state => ({
  events: state.events.items,
  isFetching: state.events.isFetching,
})

const mapDispatchToProps = dispatch => ({
  fetchEvents() {
    dispatch(fetchEvents(getAllEvents))
  },
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  navigateToEvent: (event: HallingEvent) =>
    ownProps.navigation.navigate("Event", { event }),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  HomeScreen
)
