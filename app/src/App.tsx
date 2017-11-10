import PushController from './containers/PushController';
import { Text } from "native-base"
import React, { SFC } from "react"
import { DrawerNavigator } from "react-navigation"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/es/integration/react"

import configureStore from "./configureStore"
import HomeScreen from "./containers/HomeScreen"

const { persistor, store } = configureStore()

const onBeforeLift = () => {
  // take some action before the gate lifts
}

const Content: any = DrawerNavigator({
  Home: { screen: HomeScreen },
})

export const App: SFC<any> = props => (
  <Provider store={store}>
    <PersistGate
      loading={<Text>Loading...</Text>}
      onBeforeLift={onBeforeLift}
      persistor={persistor}
    >
      <PushController/>
      <Content />
    </PersistGate>
  </Provider>
)
