/** @format */

// @flow

import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box } from "grommet"

import { toCommas } from "../_helpers"
import { Brand, NavLinks, PatentNav } from "./_header"

const Header = ({
  size,
  activePatent,
}: {
  size: string,
  activePatent: {
    attributes: {
      number: string,
    },
  },
}) => {
  //helpers
  const DISPLAY_SMALL = size === "small"
  const DISPLAY_LARGE = size === "large"

  const activePatentNumber =
    activePatent &&
    activePatent.attributes &&
    toCommas(activePatent.attributes.number)

  const patentPath = () => `/patents/${activePatent.attributes.number}`

  return (
    <Box
      direction="row"
      justify="center"
      pad={{ horizontal: "medium" }}
      background="brand"
    >
      <Box direction="row" fill="horizontal" align="center" justify="between">
        <Brand DISPLAY_SMALL={DISPLAY_SMALL} />
        {!activePatentNumber ? (
          <NavLinks />
        ) : (
          <PatentNav label={`U.S. ${activePatentNumber}`} path={patentPath()} />
        )}
      </Box>
    </Box>
  )
}

const mapState = ({ patent }) => ({
  activePatent: patent.activePatent,
})

const mapDispatch = dispatch => ({})

export default connect(
  mapState,
  mapDispatch,
)(Header)
