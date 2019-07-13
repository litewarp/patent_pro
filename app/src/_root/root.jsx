/** @format */
// @flow
import * as React from "react"
import { Route, Switch } from "react-router-dom"
import { Box, Grommet, ResponsiveContext } from "grommet"
import theme from "./theme"
// until rr5 has its own hook
import styled from "styled-components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

// Components
import Header from "./header/header"
import Footer from "./components/footer"
import LandingPage from "../home/home"
import Patent from "../patent/patent"

const StylishToast = styled(ToastContainer)`
  margin-top: 100px;
`

const Content = ({ children }: { children?: React.Node }) => (
  <>
    <Header />
    <StylishToast />
    <Box fill>{children}</Box>
    <Footer />
  </>
)
const Root = () => (
  <Grommet theme={theme} full>
    <Switch>
      <Content>
        <Route exact path="/" component={LandingPage} />
        <Route path="/patents/:id" component={Patent} />
      </Content>
    </Switch>
  </Grommet>
)

export default Root
