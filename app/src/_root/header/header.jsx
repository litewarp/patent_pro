/** @format */

// @flow

import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box } from "grommet"
import { toCommas } from "../_helpers"
import { Brand, NavLinks, PatentNav } from "./navs"
import PatentForm from "../../form/form"
import styled from "styled-components"

const FixedBox = styled(Box)`
  max-width: 1280px;
`

const Header = ({ size, pathname }: { size: string, pathname: string }) => {
  //responsive helpers
  const isDisplaySmall = size === "small"
  const brandText = pathname === "/" ? "SETHI P.C." : "PATENT PRO"

  return (
    <Box
      direction="row"
      pad={{ horizontal: "medium" }}
      background="brand"
      justify="center"
    >
      <FixedBox fill direction="row" justify="between">
        <Brand isDisplaySmall text={brandText} />
        <Box
          direction="row"
          basis={isDisplaySmall ? "1/2" : "1/4"}
          align="center"
        >
          <PatentForm />
        </Box>
      </FixedBox>
    </Box>
  )
}
export default Header
