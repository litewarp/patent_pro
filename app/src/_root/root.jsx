/** @format */
// @flow
import * as React from "react"
import { Box, Grommet } from "grommet"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"


import Home from "../home"
import List from "../patent"
import Patent from "../column"
import Layout from "./withLayout"

const Root = () => (
  <Router>
    <Layout>
      <Route exact path="/" component={Home} />
      <Route exact path="/patents" component={List} />
      <Route path="/patents/:id" component={Patent} />
    </Layout>
  </Router>
)

export default Root
