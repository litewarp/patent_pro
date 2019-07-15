/** @format */
// @flow

import * as React from "react"
import { Box, Heading, Anchor, Button } from "grommet"
import Select from "react-select"
import { toCommas } from "../_root/_helpers"
import styled from "styled-components"
import {
  columnSelectIcon,
  FixedBox,
  ColumnSelect,
  columnNumberSelectStyles,
} from "./_styles"
import { Rewind, FastForward } from "grommet-icons"
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
  //range starts at 0 in js (miss you ruby)
  const array = [...Array(columnsLength).keys()]
  // increment the number of columns by 1
  const options = array.map(col => ({
    value: col + 1,
    label: `Column ${col + 1}`,
  }))
  const toggleItem = val => {
    const newArray = visibleItems.includes(val)
      ? visibleItems.filter(i => i.toString() != val)
      : [val, ...visibleItems]
    setVisibleItems(newArray)
  }
  const ColumnButton = ({ name }: { name: string }) => (
    <Button
      hoverIndicator={true}
      size="large"
      color="dark-6"
      icon={fetchIcon(name)}
      active={isVisible(name)}
      onClick={() => toggleItem(name)}
    />
  )
  const isVisible = val => visibleItems.includes(val)
  const selectValue = options[activeColumn - 1]
  const fetchIcon = (name: string) =>
    columnSelectIcon({ name: name, isVisible: isVisible(name) })

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
        <Button
          size="large"
          color="dark-6"
          icon={<Rewind />}
          onClick={() => decrement()}
        />
        <ColumnButton name="rawImg" />
        <ColumnButton name="linedImg" />
        <ColumnButton name="splitImg" />

        <ColumnSelect
          options={options}
          value={options[activeColumn - 1]}
          onChange={({ value }) => {
            setActiveColumn(value)
          }}
          styles={columnNumberSelectStyles}
        />

        <ColumnButton name="singleLineTable" />

        <ColumnButton name="columnText" />

        <Button
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
