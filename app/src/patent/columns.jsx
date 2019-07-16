/** @format */
// @flow

import * as React from "react"
import { Box } from "grommet"
import Loading from "./_loading"
import Column from "./column"
import ColumnText from "./_columnText"
import LineTable from "./_lineTable"
import { StyledImage } from "./_styles"

const Columns = ({
  columns,
  activeColumn,
  setActiveColumn,
  visibleItems,
  setVisibleItems,
}: {
  columns: [],
  activeColumn: number,
  setActiveColumn: number => void,
  visibleItems: Array<string>,
  setVisibleItems: (Array<string>) => void,
}) => {
  const getColumn = number => {
    const results = columns.filter(col => col.attributes.number === number)
    return results && results[0]
  }
  const column = getColumn(activeColumn)

  const isVisible = val => visibleItems.includes(val)

  const textAsLines =
    column &&
    column.attributes &&
    column.attributes.text &&
    column.attributes.text.split("\n")

  return (
    <Box fill gridArea="body" direction="row" pad="medium" gap="medium" wrap>
      {!(column && column.attributes) ? (
        <Loading />
      ) : (
        <>
          <Column isVisible={isVisible("rawImg")} label="Raw Image">
            <StyledImage
              fit="contain"
              src={column && column.attributes.masterImgUrl}
            />
          </Column>
          <Column
            isVisible={isVisible("linedImg")}
            label="Whitespace Calculated Lines"
          >
            <StyledImage
              fit="contain"
              src={column && column.attributes.linedImgUrl}
            />
          </Column>
          <Column
            isVisible={isVisible("splitImg")}
            label="Raw split into 67 rows"
          >
            <StyledImage
              fit="contain"
              src={column && column.attributes.splitImgUrl}
            />
          </Column>
          <Column
            isVisible={isVisible("singleLineTable")}
            label="Raw split lines with OCR"
          >
            <LineTable columnId={column.id} />
          </Column>
          <Column isVisible={isVisible("columnText")} label="Raw column text">
            <ColumnText textAsLines={textAsLines} />
          </Column>
        </>
      )}
    </Box>
  )
}

export default Columns
