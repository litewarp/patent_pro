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
import LandingPage from "../home"
import Patent from "../patent/patent"

const StylishToast = styled(ToastContainer)`
  margin-top: 100px;
`
const Root = () => (
  <Grommet theme={theme} full>
    <ResponsiveContext.Consumer>
      {({ size }) => (
        <Router>
          <Box fill alignContent="center">
            <Header size={size} />
            <Box fill>
              <StylishToast />
              <Route exact path="/" component={LandingPage} />
              <Route path="/patents/:id" component={Patent} />
            </Box>
            <Footer />
          </Box>
        </Router>
      )}
    </ResponsiveContext.Consumer>
  </Grommet>
)

export default Root
