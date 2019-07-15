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
}) => {
  const imgSource = patentProps && patentProps.linedImgUrl ? patentProps.linedImgUrl : patentProps.masterImgUrl
  (
  <Box gridArea="images" pad="medium">
    <Image fit="contain" src={imgSource} />
  </Box>
)

export default ImageMockups
