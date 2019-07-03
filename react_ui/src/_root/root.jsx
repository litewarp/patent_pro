/** @format */

import * as React from "react"
import { Box, Grommet } from "grommet"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Home from "../home"
import List from "../patent"
import Patent from "../column"

import store from "./store"
import theme from "./theme"

const Root = () => (
  <Provider store={store}>
    <Grommet theme={theme} full>
      <Box fill pad="large" align="center">
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/patents" component={List} />
          <Route path="/patents/:id" component={Patent} />
        </Router>
      </Box>
    </Grommet>
  </Provider>
)

export default Root
