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

const withLayout = <PassedProps: { match: { path: string | void } }>(
  Component: React.ComponentType<PassedProps>,
): React.ComponentType<$Diff<PassedProps, LayoutProps>> =>
  class WithLayout extends React.Component<PassedProps> {
    render() {
      const { match, ...props } = this.props
      return (
        <Grommet theme={theme} full>
          <ResponsiveContext.Consumer>
            {size => (
              <Box fill alignContent="center">
                <Header size={size} path={match.path} />
                <Box pad="small" fill>
                  <Component match={match} {...props} />
                </Box>
                <Footer size={size} />
              </Box>
            )}
          </ResponsiveContext.Consumer>
        </Grommet>
      )
    }
  }

export default withLayout
