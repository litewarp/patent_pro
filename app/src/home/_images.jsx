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
  console.log(patentProps)
  return (
    <Box gridArea="images" pad="medium">
      <Image
        fit="contain"
        src={
          patentProps &&
          patentProps.attributes &&
          patentProps.attributes.linedImUrl
        }
      />
    </Box>
  )
}

export default ImageMockups
