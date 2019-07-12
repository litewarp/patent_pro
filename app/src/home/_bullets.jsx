/** @format */

// @flow
import * as React from "react"
import { Box, Text, Heading } from "grommet"
import {
  DocumentDownload,
  BlockQuote,
  Bookmark,
  StatusCritical,
  StatusGood,
} from "grommet-icons"
import styled from "styled-components"

const BulletPointTitle = styled(Heading)`
  text-decoration: underline;
`

const BulletPoint = ({
  icon,
  text,
  passing,
}: {
  icon: React.Element<{}>,
  text: string,
  passing?: boolean,
}) => (
  <Box direction="row" align="end" justify="between" gap="large">
    <Text size="medium" margin={{ right: "auto" }}>
      {text}
    </Text>
    {icon}
    {passing ? <StatusGood color="green" /> : <StatusCritical color="red" />}
  </Box>
)
const BulletPoints = () => (
  <Box gap="small" gridArea="bullets">
    <BulletPointTitle margin="none" color="neutral-3" level={3}>
      Feature List
    </BulletPointTitle>
    <BulletPoint
      icon={<DocumentDownload />}
      text="Split patents into columns and extract the text"
      passing={true}
    />
    <BulletPoint
      icon={<BlockQuote />}
      text="One-click snippets with column and line numbers"
    />
    <BulletPoint
      icon={<Bookmark />}
      text="Add annotations and share them with colleagues"
    />
  </Box>
)

export default BulletPoints
