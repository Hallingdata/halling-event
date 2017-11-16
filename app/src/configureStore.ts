import { applyMiddleware, compose, createStore } from "redux"
import { persistCombineReducers, persistStore } from "redux-persist"
import storage from "redux-persist/es/storage"
import thunkMiddleware from "redux-thunk"

import events from "./reducers/events"

const config = {
  key: "root",
  storage,
}
const reducer = persistCombineReducers(config, { events })
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  )
  const persistor = persistStore(store)

  return { persistor, store }
}
