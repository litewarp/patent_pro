/** @format */
// @flow
import React from "react"
import ReactDOM from "react-dom"
import Root from "./_root/root"
import { ConnectedRouter } from "connected-react-router"
import { Provider } from "react-redux"
import configureStore from "./_root/store"

const { store, history } = configureStore()
const root = document.getElementById("root")

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Root />
    </ConnectedRouter>
  </Provider>
)
ReactDOM.render(<App />, root)

if (module.hot) {
  module.hot.accept()
}
