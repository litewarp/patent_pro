/** @format */

// @flow

import * as React from "react"
import { Box, ResponsiveContext } from "grommet"
import { useSelector } from "react-redux"
import { Brand } from "./navs"
import PatentForm from "../../form/form"
import styled from "styled-components"

const FixedBox = styled(Box)`
  max-width: 1280px;
`
const Header = () => {
  const pathname = useSelector(({ router }) => router.pathname)
  //responsive helpers
  const brandText = pathname === "/" ? "SETHI P.C." : "PATENT PRO"

  return (
    <ResponsiveContext.Consumer>
      {({ size }) => (
        <Box
          direction="row"
          pad={{ horizontal: "medium" }}
          background="brand"
          justify="center"
        >
          <FixedBox fill direction="row" justify="between">
            <Brand isDisplaySmall={size === "small"} text={brandText} />
            <Box
              direction="row"
              basis={size === "small" ? "1/2" : "1/4"}
              align="center"
            >
              <PatentForm />
            </Box>
          </FixedBox>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  )
}
export default Header
