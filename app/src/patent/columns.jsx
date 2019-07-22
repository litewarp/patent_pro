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
  activePatent,
}: {
  columns: [],
  activeColumn: number,
  setActiveColumn: number => void,
  visibleItems: Array<string>,
  setVisibleItems: (Array<string>) => void,
}) => {
  const getColumn = number => {
    const results = columns.filter(col => col.attributes.number == number)
    return results && results[0]
  }
  const column = getColumn(activeColumn)

  const isVisible = val => visibleItems.includes(val)

  const rawText =
    column &&
    column.attributes &&
    column.attributes.extractedText &&
    column.attributes.extractedText.split("\n")

  const matchedText =
    column &&
    column.attributes &&
    column.attributes.matchedText &&
    column.attributes.matchedText.split("\n")

  return (
    <Box fill gridArea="body" direction="row" pad="medium" gap="medium" wrap>
      {!(activePatent && activePatent.attributes) ? (
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
            isVisible={isVisible("fuzzyMatch")}
            label="Fuzzy matched line text"
          >
            <ColumnText textAsLines={matchedText} />
          </Column>
          <Column
            isVisible={isVisible("singleLineTable")}
            label="Raw split lines with OCR"
          >
            <LineTable columnId={column && column.id} />
          </Column>
          <Column isVisible={isVisible("columnText")} label="Raw column text">
            <ColumnText textAsLines={rawText} />
          </Column>
        </>
      )}
    </Box>
  )
}

export default Columns
