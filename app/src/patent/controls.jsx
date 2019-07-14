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
  TextAlignFull,
} from "grommet-icons"
import { Box, Heading, Anchor, Select } from "grommet"
import { toCommas } from "../_root/_helpers"
import styled from "styled-components"

const FixedBox = styled(Box)`
  max-width: 1280px;
`
const ColumnSelect = styled(Select)`
  input {
    font-size: 1em;
    padding: 0;
  }
`
const controlIcon = ({
  component,
  isVisible,
}: {
  component: React.AbstractComponent<{}>,
  isVisible: boolean,
}) => <icon color={isVisible ? "selected" : "dark-3"} />

const Controls = ({
  increment,
  decrement,
  setActiveColumn,
  columnsLength,
  activeColumn,
  visibleItems,
  setVisibleItems,
}: {
  increment: () => void,
  decrement: () => void,
  setActiveColumn: number => void,
  columnsLength: number,
  activeColumn: number,
  visibleItems: [number],
  setVisibleItems: (Array<string>) => void,
}) => {
  const array = [...Array(columnsLength).keys()]
  const options = array.map(col => `Column ${col}`)

  const toggleItem = val => {
    const newArray = visibleItems.includes(val)
      ? visibleItems.filter(i => i.toString() != val)
      : [val, ...visibleItems]
    setVisibleItems(newArray)
  }

  const isVisible = val => visibleItems.includes(val)

  const getIcon = (name: string) => {
    switch (name) {
      case "rawImg":
        return (
          <DocumentImage
            color={isVisible(name) ? "status-warning" : "dark-6"}
          />
        )
      case "linedImg":
        return (
          <OrderedList color={isVisible(name) ? "status-warning" : "dark-6"} />
        )
      case "lineText":
        return (
          <TextAlignFull
            color={isVisible(name) ? "status-warning" : "dark-6"}
          />
        )
      case "columnText":
        return <Grid color={isVisible(name) ? "status-warning" : "dark-6"} />
    }
  }

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
        <Anchor
          size="large"
          color="dark-6"
          icon={<Rewind />}
          onClick={() => decrement()}
        />
        <Anchor
          size="large"
          color="dark-6"
          icon={getIcon("rawImg")}
          onClick={() => toggleItem("rawImg")}
        />
        <Anchor
          size="large"
          color="dark-6"
          icon={getIcon("columnText")}
          onClick={() => toggleItem("columnText")}
        />
        <ColumnSelect
          options={options}
          value={`Column ${activeColumn}`}
          onChange={({ option }) => setActiveColumn(option)}
        />
        <Anchor
          size="large"
          color="dark-6"
          icon={getIcon("linedImg")}
          onClick={() => toggleItem("linedImg")}
        />
        <Anchor
          size="large"
          color="dark-6"
          icon={getIcon("lineText")}
          onClick={() => toggleItem("lineText")}
        />
        <Anchor
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
