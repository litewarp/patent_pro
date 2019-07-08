/** @format */
// @flow
import React from "react"
import styled from "styled-components"
import { Box, Heading } from "grommet"

const FooterNav = styled(Box)`
  position: absolute;
  bottom: 0;
  width: 100%;
  opacity: 0.6;
`

const Footer = () => (
  <FooterNav direction="row-reverse" background="dark-1" fluid>
    <Heading
      margin={{ top: ".25rem", bottom: "0", left: "0", right: "1.5rem" }}
      color="light-4"
      level={6}
    >
      &copy; 2019 SETHI P.C.{" "}
    </Heading>
  </FooterNav>
)

export default Footer
