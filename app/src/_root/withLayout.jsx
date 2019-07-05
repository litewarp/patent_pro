/** @format */
// @flow
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Grommet, Box, ResponsiveContext, Button } from "grommet"
import { ToastContainer } from "react-toastify"
import theme from "./theme"
// Components
import Header from "./components/header"
import Footer from "./components/footer"
import styled from "styled-components"
import { newToast } from "../_redux/layoutActions"

const Layout = ({
  children,
  newToast,
}: {
  children: React.AbstractComponent<{}>,
  newToast: string => void,
}) => {
  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill alignContent="center">
            <Header size={size} />
            <ToastContainer autoClose={2000} />
            <Box pad="small" fill align="center">
              <Button label="click me!" onClick={() => newToast("toasty!")} />
              {children}
            </Box>
            <Footer size={size} />
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  )
}

const mapState = ({ layout }) => ({
  toasts: layout.toasts,
})

const mapDispatch = dispatch => ({
  newToast: bindActionCreators(newToast, dispatch),
})

export default connect(
  mapState,
  mapDispatch,
)(Layout)
