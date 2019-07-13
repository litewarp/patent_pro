/** @format */

import * as React from "react"

import { Box, Image } from "grommet"

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
  <Box gridArea="images" fill pad="large" wrap pad="medium">
    <Image fit="contain" src={patentProps && patentProps.masterImgUrl} />
  </Box>
)

export default ImageMockups
