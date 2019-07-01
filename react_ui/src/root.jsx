/** @format */

import * as React from "react"
import { Grommet } from "grommet"
import { Provider } from "react-redux"
import store from "./_redux/store"
import App from "./App"

const Root = () => (
  <Provider store={store}>
    <Grommet plain full>
      <App />
    </Grommet>
  </Provider>
)

export default Root
