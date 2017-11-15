import EventContainer from "./containers/EventContainer"
import EventScreen from "./components/EventScreen"
import PushController from "./containers/PushController"
import { Text, Badge } from "native-base"
import React, { SFC } from "react"
import { DrawerNavigator, StackNavigator } from "react-navigation"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/es/integration/react"

import configureStore from "./configureStore"
import HomeContainer from "./containers/HomeContainer"
import OnInit from "./containers/OnInit"
import { TouchableOpacity } from "react-native"

const { persistor, store } = configureStore()

const onBeforeLift = () => {
  // take some action before the gate lifts
}

const Content: any = StackNavigator({
  Home: {
    screen: HomeContainer,
    navigationOptions: ({ navigation }) => ({
      title: `Arrangementer`,
    }),
  },
  Event: { screen: EventContainer },
})

export const App: SFC<any> = props => (
  <Provider store={store}>
    <PersistGate
      loading={<Text>Loading...</Text>}
      onBeforeLift={onBeforeLift}
      persistor={persistor}
    >
      <OnInit />
      <Content />
    </PersistGate>
  </Provider>
)

//TODO: put in:       <OnInit/>
