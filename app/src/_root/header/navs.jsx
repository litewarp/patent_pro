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
const PatentLink = styled(Heading)`
  font-weight: 600;
`

const HeaderLink = styled(PatentLink)`
  font-variant: all-small-caps;
  font-family: Gibbs, sans-serif;
`

const BrandLink = styled(LinkNoStyle)`
  margin-right: auto;
`

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
    <HeaderLink color="light-2" level={3}>
      {label}
      {children}
    </HeaderLink>
  </LinkNoStyle>
)

export const PatentNav = ({
  path,
  label,
  children,
}: {
  path: string,
  label: string,
  children?: {},
}) => (
  <LinkNoStyle to={path}>
    <PatentLink color="light-2" level={3}>
      {label}
      {children}
    </PatentLink>
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
      size="medium"
      level={2}
      color="light-3"
    >
      PATENT PRO
    </BrandHeading>
  </BrandLink>
)
