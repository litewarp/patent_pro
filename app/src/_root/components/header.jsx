/** @format */

// @flow

import * as React from "react"
import { Box } from "grommet"

import { Brand, NavLinks } from "./_header"

const Header = ({ size }: { size: string }) => {
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
