/** @format */
// @flow
import * as React from "react"
import { Box, Heading } from "grommet"
import { Link } from "react-router-dom"
import styled from "styled-components"

export const NavLinks = () => (
  <Box direction="row" gap="large">
    <HeaderNav path="/patents" label="Patents" />
    <HeaderNav path="/home" label="New" />
  </Box>
)

export const LinkNoStyle = styled(Link)`
    text-decoration: none;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
    }
  }
`
const HeaderLink = styled(Heading)`
  font-family: Gibbs, sans-serif;
  font-weight: 600;
  font-variant: all-small-caps;
`

const BrandLink = styled(LinkNoStyle)``

export const HeaderNav = ({
  path,
  label,
  children,
}: {
  path: string,
  label: string,
  children?: {},
}) => (
  <LinkNoStyle to={path}>
    <HeaderLink color="dark-2" level={3}>
      {label}
      {children}
    </HeaderLink>
  </LinkNoStyle>
)

const BrandHeading = styled(Heading)`
  font-family: brandon-grotesque;
  font-weight: 900;
  line-height: 18px;
`

export const Brand = ({ DISPLAY_SMALL }: { DISPLAY_SMALL: boolean }) => (
  <BrandLink to="/">
    <BrandHeading
      margin={{ horizontal: "small" }}
      size={DISPLAY_SMALL ? "medium" : "large"}
      level={2}
      color={DISPLAY_SMALL ? "neutral-2" : "neutral-3"}
    >
      SETHI P.C.
    </BrandHeading>
  </BrandLink>
)
