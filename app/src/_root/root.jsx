/** @format */
// @flow
import * as React from "react"
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom"
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

const Content = ({
  children,
  location,
}: {
  children: Array<{}>,
  location: {
    pathname: string,
  },
}) => (
  <ResponsiveContext.Consumer>
    {({ size }) => (
      <>
        <Header size={size} pathname={location.pathname} />
        <StylishToast />
        <Box fill>{children}</Box>
        <Footer />
      </>
    )}
  </ResponsiveContext.Consumer>
)

const MainContent = withRouter(Content)

const Root = () => (
  <Grommet theme={theme} full>
    <Router>
      <Box fill alignContent="center">
        <MainContent>
          <Route exact path="/" component={LandingPage} />
          <Route path="/patents/:id" component={Patent} />
        </MainContent>
      </Box>
    </Router>
  </Grommet>
)

export default Root
