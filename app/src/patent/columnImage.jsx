/** @format */

// @flow
import * as React from "react"
import { Box, Image, Heading } from "grommet"
import styled from "styled-components"

const VisibilityToggleBox = styled(Box)`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
`

const ColumnImage = ({
  label,
  children,
  isVisible,
}: {
  label: string,
  children: React.Node,
  isVisible: boolean,
}) => {
  return (
    <VisibilityToggleBox
      isVisible={isVisible}
      align="center"
      gap="small"
      fill="vertical"
      width="auto"
      margin={{ left: "small" }}
    >
      <Heading
        color="neutral-4"
        level={3}
        margin="none"
        pad="small"
        margin={{ bottom: "small" }}
      >
        {label.toUpperCase()}
      </Heading>
      {children}
    </VisibilityToggleBox>
  )
}

export default ColumnImage
