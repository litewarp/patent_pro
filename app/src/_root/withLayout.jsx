/** @format */
// @flow
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Grommet, Box, ResponsiveContext } from "grommet"
import theme from "./theme"
// Components
import Header from "./components/header"
import Footer from "./components/footer"
import styled from "styled-components"

type LayoutProps = {}

const Layout = ({ children }: { children: React.AbstractComponent<{}> }) => {
  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill alignContent="center">
            <Header size={size} />
            <Box pad="small" fill align="center">
              {children}
            </Box>
            <Footer size={size} />
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  )
}

export default Layout
