/** @format */

// @flow
import * as React from "react"
import { Box, Text, Heading } from "grommet"
import {
  DocumentDownload,
  OrderedList,
  BlockQuote,
  Bookmark,
  StatusCritical,
  StatusGood,
  StatusWarning,
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
  passing?: string,
}) => {
  const StatusIcon =
    passing === "good" ? (
      <StatusGood color="green" />
    ) : passing === "warning" ? (
      <StatusWarning color="orange" />
    ) : (
      <StatusCritical color="red" />
    )
  return (
    <Box direction="row" justify="between" gap="medium" pad="large">
      {icon}
      <Text size="large" margin={{ right: "auto" }}>
        {text}
      </Text>
      {StatusIcon}
    </Box>
  )
}
const BulletPoints = () => (
  <Box pad="medium" gap="small" gridArea="bullets">
    <BulletPointTitle
      alignSelf="center"
      margin="none"
      color="neutral-3"
      pad="large"
      level={3}
    >
      Development Roadmap
    </BulletPointTitle>
    <BulletPoint
      icon={<DocumentDownload />}
      text="Download and extract column text by number"
      passing={"good"}
    />
    <BulletPoint
      icon={<OrderedList />}
      text="Assign line numbers to extracted text"
      passing={"warning"}
    />
    <BulletPoint
      icon={<BlockQuote />}
      text="One-click snippets with column and line numbers"
      passing={"error"}
    />
    <BulletPoint
      icon={<Bookmark />}
      text="Add annotations and share them with colleagues"
    />
  </Box>
)

export default BulletPoints
