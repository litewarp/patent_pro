/** @format */
// @flow
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Grommet, Box, ResponsiveContext, Button } from "grommet"
import { ToastContainer } from "react-toastify"
import theme from "./theme"
import "react-toastify/dist/ReactToastify.min.css"
// Components
import Header from "./components/header"
import Footer from "./components/footer"
import styled from "styled-components"
import { newToast } from "../_redux/layoutActions"

const StylishToast = styled(ToastContainer)`
  margin-top: 100px;
`

const Layout = ({ children }: { children: React.AbstractComponent<{}> }) => (
  <Grommet theme={theme} full>
    <ResponsiveContext.Consumer>
      {size => (
        <Box fill alignContent="center">
          <Header size={size} />
          <StylishToast />
          {children}
          <Footer size={size} />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  </Grommet>
)

export default Layout
