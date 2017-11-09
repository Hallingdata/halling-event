import React, { SFC } from "react"
import { DrawerNavigator } from "react-navigation"

import { Provider } from "react-redux"
import configureStore from "./configureStore"

import HomeScreen from "./containers/HomeScreen"

const Content: any = DrawerNavigator({
  Home: { screen: HomeScreen },
})

const store = configureStore()

export const App: SFC<any> = props => (
  <Provider store={store}>
    <Content />
  </Provider>
)
