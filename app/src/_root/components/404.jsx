/** @format */

import * as React from "react"
import { Box, Grommet, Heading, Button } from "grommet"
import { Alert } from "grommet-icons"
import styled from "styled-components"

const NoPageFound = () => (
  <Box gap="large" pad="large" align="center" alignSelf="center">
    <Heading level={1}>Page Not Found</Heading>
    <Button primary href="/" size="large" label="Back to Home" />
  </Box>
)

export default NoPageFound
