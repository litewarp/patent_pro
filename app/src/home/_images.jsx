/** @format */

import * as React from "react"

import { Box, Image } from "grommet"
import styled from "styled-components"

const StyledImage = styled(Image)`
  max-width: 300px;
`

const ImageMockups = ({
  patentProps,
}: {
  patentProps: {
    masterImgUrl: string,
    linedImgUrl: string,
    splitImgUrl: string,
  },
}) => {
  return (
    <Box gridArea="images" pad="medium">
      <StyledImage fit="contain" src={patentProps && patentProps.linedImgUrl} />
    </Box>
  )
}

export default ImageMockups
