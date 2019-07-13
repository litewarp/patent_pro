/** @format */
// @flow

import * as React from "react"
import {
  LinkNext,
  LinkPrevious,
  Rewind,
  FastForward,
  DocumentImage,
  DocumentText,
  OrderedList,
  Grid,
} from "grommet-icons"
import { Box, Heading, Anchor, Select } from "grommet"
import { toCommas } from "../_root/_helpers"
import styled from "styled-components"

const StyledAnchor = styled(Anchor)`
  height: 24px;
`
const FixedBox = styled(Box)`
  max-width: 1280px;
`
const ColumnSelect = styled(Select)`
  input {
    font-size: 1em;
    padding: 0;
  }
`

const Icons = [Rewind, DocumentImage, DocumentText, OrderedList, Grid]

const Controls = ({
  increment,
  decrement,
  setActiveColumn,
  columnsLength,
  activeColumn,
}: {
  increment: () => void,
  decrement: () => void,
  setActiveColumn: mixed => void,
  columnsLength: number,
  activeColumn: number,
}) => {
  const array = [...Array(columnsLength).keys()]
  const options = array.map(col => `Column ${col}`)
  return (
    <Box
      gridArea="header"
      background="dark-3"
      alignContent="center"
      align="center"
      justify="center"
    >
      <FixedBox
        fill="horizontal"
        direction="row"
        align="center"
        justify="between"
      >
        <StyledAnchor
          size="large"
          color="dark-6"
          icon={<Rewind />}
          onClick={() => decrement()}
        />
        <StyledAnchor size="large" color="dark-6" icon={<DocumentImage />} />
        <StyledAnchor size="large" color="dark-6" icon={<DocumentText />} />
        <ColumnSelect
          options={options}
          value={`Column ${activeColumn}`}
          onChange={({ option }) => setActiveColumn(option)}
        />
        <StyledAnchor size="large" color="dark-6" icon={<OrderedList />} />
        <StyledAnchor size="large" color="dark-6" icon={<Grid />} />
        <StyledAnchor
          size="large"
          color="dark-6"
          icon={<FastForward />}
          onClick={() => increment()}
        />
      </FixedBox>
    </Box>
  )
}

export default Controls
