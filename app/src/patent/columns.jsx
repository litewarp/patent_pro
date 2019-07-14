/** @format */

import * as React from "react"
import { Box, Heading, Image, Table } from "grommet"
import Loading from "./_loading"
import ColumnImage from "./columnImage"

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
    const results = columns.filter(col => col.attributes.number == number)
    return results && results[0]
  }
  const column = getColumn(activeColumn)

  const isVisible = val => visibleItems.includes(val)

  if (!(column && column.attributes)) {
    return <Loading />
  } else {
    return (
      <Box
        fill
        gridArea="body"
        direction="row"
        pad="medium"
        wrap
        gap="medium"
        justify="center"
      >
        <ColumnImage
          isVisible={isVisible("rawImg")}
          img={column && column.attributes.masterImgUrl}
          label="Raw Image"
        />
        <ColumnImage
          isVisible={isVisible("linedImg")}
          img={column && column.attributes.linedImgUrl}
          label="Algorithmic Split"
        />
        <ColumnImage
          isVisible={isVisible("splitImg")}
          img={column && column.attributes.splitImgUrl}
          label="Line Count Split"
        />
        <ColumnImage
          isVisible={isVisible("singleLineTable")}
          label="Column as 67 split lines (for OCR)"
        >
          <Table />
        </ColumnImage>
        <ColumnImage
          isVisible={isVisible("singleLineTableText")}
          label="OCR extracted text from 67 split line PDFs"
        />
        <ColumnImage
          isVisible={isVisible("columnText")}
          label="OCR extracted text from raw column pdf"
        />
      </Box>
    )
  }
}

export default Columns
