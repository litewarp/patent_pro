/** @format */

// @flow

import * as React from "react"
import { Box, Heading, Meter, Text } from "grommet"

const Loading = () => {
  const [circleFill, setCircleFill] = React.useState(10)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCircleFill(circleFill < 100 ? circleFill + 8 : 10)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box fill alignContent="center" align="center">
      <Heading level={2}>Hold Tight!</Heading>
      <Heading level={4}>The computer is doing its computer thingy</Heading>
      <Text>Give it like 5-10 minutes. It had a rough night.</Text>
      <Box align="center" pad="medium">
        <Meter
          type="circle"
          background="neutral-2"
          values={[{ circleFill, color: "neutral-2" }]}
        />
      </Box>
    </Box>
  )
}

export default Loading
