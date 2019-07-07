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
import Header from "./components/header"
import Footer from "./components/footer"
import Home from "../home"
import ActivePatent from "../_patent"

const StylishToast = styled(ToastContainer)`
  margin-top: 100px;
`
const Root = () => (
  <Grommet theme={theme} full>
    <Router>
      <ResponsiveContext.Consumer>
        {size => (
          <Box alignContent="center">
            <Header size={size} />
            <StylishToast />
            <Route exact path="/" component={Home} />
            <Route path="/patents/:id" component={ActivePatent} />
            <Footer size={size} />
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Router>
  </Grommet>
)

export default Root
