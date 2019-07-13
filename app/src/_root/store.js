/** @format */
// @flow

import { createStore, applyMiddleware, compose } from "redux"
import createRootReducer from "./rootReducer"
import thunk from "redux-thunk"
import logger from "redux-logger"
import paramsMiddleware from "@tshio/redux-api-params-middleware"
import { apiMiddleware } from "redux-api-middleware"
import { createBrowserHistory } from "history"

export const history = createBrowserHistory()

const middleware = [paramsMiddleware, apiMiddleware, thunk, logger]

const enhancers = []
// Dev tools are helpful
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

const store = (preloadedState: mixed) => {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composedEnhancers,
  )
}
if (module.hot) {
  module.hot.accept("./rootReducer", () => {
    const nextRootReducer = require("./rootReducer")
    const finalReducer = { ...nextRootReducer }
    store.replaceReducer(finalReducer)
  })
}

export default store
