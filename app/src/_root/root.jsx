/** @format */
// @flow
import * as React from "react"
import { Box, Grommet } from "grommet"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Home from "../home"
import ActivePatent from "../_patent"
import Layout from "./withLayout"

const Root = () => (
  <Router>
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/patents/:id" component={ActivePatent} />
    </Layout>
  </Router>
)

export default Root
