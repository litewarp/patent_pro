/** @format */
// @flow
import * as React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Box, Grommet, ResponsiveContext } from "grommet"
import theme from "./theme"

import styled from "styled-components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

// Components
import Header from "./header/header"
import Footer from "./components/footer"
import Home from "../home"
import ActivePatent from "../patent"

const StylishToast = styled(ToastContainer)`
  margin-top: 100px;
`
const Root = () => (
  <Grommet theme={theme} full>
    <Router>
      <Box fill alignContent="center">
        <Header />
        <Box fill>
          <StylishToast />
          <Route exact path="/" component={Home} />
          <Route path="/patents/:id" component={ActivePatent} />
        </Box>
        <Footer />
      </Box>
    </Router>
  </Grommet>
)

export default Root
