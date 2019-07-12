/** @format */

// @flow
import * as React from "react"
import { Box, Text } from "grommet"
import { Columns, BlockQuote, Bookmark } from "grommet-icons"

const BulletPoint = ({ icon, text }) => (
  <Box direction="row" align="center" justify="start" gap="large">
    {icon}
    <Text>{text}</Text>
  </Box>
)
const BulletPoints = () => (
  <Box gap="small" gridArea="bullets">
    <BulletPoint
      icon={<Columns />}
      text="Split patents into columns and extract the text"
    />
    <BulletPoint
      icon={<BlockQuote />}
      text="Copy quotations with proper column and line numbers"
    />
    <BulletPoint
      icon={<Bookmark />}
      text="Add annotations and share them with colleagues"
    />
  </Box>
)

export default BulletPoints
