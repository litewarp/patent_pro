/** @format */

import * as React from "react"

import { Box, Heading, Image } from "grommet"

const columnOptions = [
  "Original with OCR",
  "Split_Line",
  "Split_Index",
  "Each_Line with OCR",
]

const ImageMockups = ({
  patentProps,
}: {
  patentProps: {
    masterImgUrl: string,
    linedImgUrl: string,
    splitImgUrl: string,
  },
}) => (
  <Box gridArea="images" fill pad="medium">
    <Image fit="cover" src={patentProps && patentProps.masterImgUrl} />
  </Box>
)

export default ImageMockups
