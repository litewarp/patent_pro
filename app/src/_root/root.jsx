/** @format */
// @flow
import * as React from "react"
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
} from "react-router-dom"
import { Box, Grommet, ResponsiveContext } from "grommet"
import theme from "./theme"

import styled from "styled-components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import "./customToast.css"
// Components
import Header from "./header/header"
import Footer from "./components/footer"
import LandingPage from "../home/home"
import Patent from "../patent/patent"
import NoPageFound from "./components/404"

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
      <Box alignContent="center">
        <Header size={size} pathname={location.pathname} />
        <ToastContainer
          toastClassName="burnt-toast"
          style={{
            left: "0",
            width: "100%",
            margin: "0",
          }}
          position="bottom-center"
        />
        <Box fill>{children}</Box>
        <Footer />
      </Box>
    )}
  </ResponsiveContext.Consumer>
)

const MainContent = withRouter(Content)

const Root = () => (
  <Grommet theme={theme} full>
    <Router>
      <Switch>
        <MainContent>
          <Route exact path="/" component={LandingPage} />
          <Route path="/patents/:id" component={Patent} />
          <Route component={NoPageFound} />
        </MainContent>
      </Switch>
    </Router>
  </Grommet>
)

export default Root
