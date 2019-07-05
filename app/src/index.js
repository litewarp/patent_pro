/** @format */

import React from "react"
import ReactDOM from "react-dom"
import Root from "./_root/root"
import { Provider } from "react-redux"
import store from "./_root/store"

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root"),
)
