/** @format */
// @flow

import { createStore, applyMiddleware, compose } from "redux"
import createRootReducer from "./rootReducer"
import thunk from "redux-thunk"
import logger from "redux-logger"
import paramsMiddleware from "@tshio/redux-api-params-middleware"
import { apiMiddleware } from "redux-api-middleware"
import { routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
const configureStore = (preloadedState: ?mixed) => {
  const history = createBrowserHistory()

  const middleware = [
    routerMiddleware(history),
    paramsMiddleware,
    apiMiddleware,
    thunk,
    logger,
  ]

  const enhancers = []

  if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension())
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
  )

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composedEnhancers,
  )

  if (module.hot) {
    module.hot.accept("./rootReducer", () => {
      const nextRootReducer = require("./rootReducer").default
      store.replaceReducer(nextRootReducer(history))
    })
  }
  return { store, history }
}

export default configureStore
