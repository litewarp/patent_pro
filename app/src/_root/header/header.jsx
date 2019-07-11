/** @format */

// @flow

import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box } from "grommet"
import AddPatentButton from "./addButton"
import { toCommas } from "../_helpers"
import { Brand, NavLinks, PatentNav } from "./navs"
import PatentForm from "../../_form"

const Header = ({ size }: { size: string }) => {
  //responsive helpers
  const DISPLAY_SMALL = size === "small"
  const DISPLAY_LARGE = size === "large"

  return (
    <Box
      direction="row"
      pad={{ horizontal: "medium" }}
      background="brand"
      justify="end"
      gap="medium"
    >
      <Brand DISPLAY_SMALL={DISPLAY_SMALL} />
      <Box direction="row" basis="1/4">
        <PatentForm />
      </Box>
    </Box>
  )
}
export default Header
