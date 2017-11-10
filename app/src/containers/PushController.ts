import React, { Component } from "react"
import * as R from "ramda"
import firebase, { RNFirebase } from "react-native-firebase"

export default class PushController extends Component {
  componentDidMount() {
    const messaging = getMessaging(firebase)

    messaging.requestPermissions()
    messaging.subscribeToTopic("events")

    messaging.getToken().then(token => {})

    // When app is opened from notification
    messaging.getInitialNotification().then(message => {
      console.log(
        "Got getInitialNotification as promise" + JSON.stringify(message)
      )
    })

    messaging.onMessage(message => {
      console.log(
        "Got onMessage when in app (THIS DOES NOT WORK!!!!)" +
          JSON.stringify(message)
      )
    })
  }

  render() {
    return null
  }
}

const getMessaging: (any) => RNFirebase.messaging.Messaging = firebase =>
  firebase.messaging()
