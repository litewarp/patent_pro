import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './root'
import thunk from "redux-thunk"
import logger from "redux-logger"
import paramsMiddleware from "@tshio/redux-api-params-middleware"
import { apiMiddleware } from 'redux-api-middleware'

const middleware = [
  paramsMiddleware,
  apiMiddleware,
  thunk,
  logger,
]

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

const store = createStore(
  rootReducer,
  composedEnhancers,
)

export default store
