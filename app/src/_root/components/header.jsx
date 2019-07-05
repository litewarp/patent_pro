/** @format */

// @flow

import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Box, Heading, ResponsiveContext } from "grommet"

import { Brand, NavLinks } from "./_header"

const Header = ({ size, path }: { size: string, path: string }) => {
  //helpers
  const DISPLAY_SMALL = size === "small"
  const DISPLAY_LARGE = size === "large"

  return (
    <Box
      direction="row"
      justify="center"
      pad={{ horizontal: "medium" }}
      background="brand"
    >
      <Box
        basis="1280px"
        margin={{
          left: DISPLAY_SMALL ? "0" : "50px",
        }}
        direction="row"
        fill="horizontal"
        align="center"
        justify={DISPLAY_SMALL ? "start" : "between"}
      >
        <Brand DISPLAY_SMALL={DISPLAY_SMALL} />
        {!DISPLAY_SMALL && <NavLinks />}
      </Box>
    </Box>
  )
}

export default Header
