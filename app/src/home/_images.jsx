/** @format */

import * as React from "react"

import { Box, Heading, Image } from "grommet"
import styled from "styled-components"

const ImageMockups = ({
  patentProps,
}: {
  patentProps: {
    masterImgUrl: string,
    linedImgUrl: string,
    splitImgUrl: string,
  },
}) => (
  <Box gridArea="images" pad="medium">
    <Image fit="contain" src={patentProps && patentProps.linedImgUrl} />
  </Box>
)

export default ImageMockups
