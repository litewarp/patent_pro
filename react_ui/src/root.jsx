/** @format */

import * as React from "react"
import { Grommet } from "grommet"
import { Provider } from "react-redux"
import store from "./_redux/store"
import App from "./App"
import theme from "./_theme"

const Root = () => (
  <Provider store={store}>
    <Grommet theme={theme} full>
      <App />
    </Grommet>
  </Provider>
)

export default Root
