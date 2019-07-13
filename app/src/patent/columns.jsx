/** @format */

import * as React from "react"
import { Box, Heading, Image, Table } from "grommet"
import Loading from "./_loading"
import ColumnImage from "./columnImage"

const Columns = ({
  activeColumn,
  setActiveColumn,
  columns,
}: {
  activeColumn: number,
  columns: Array<{}>,
}) => {
  const getColumn = number => {
    const results = columns.filter(col => col.attributes.number == number)
    return results && results[0]
  }
  const column = getColumn(activeColumn)
  const { masterImgUrl, lineImgUrl, splitImgUrl } = column && column.attributes

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
      {!masterImgUrl ? (
        <Loading />
      ) : (
        <>
          <ColumnImage
            name="rawImg"
            img={column && column.attributes.masterImgUrl}
            label="Raw Image"
          />
          <ColumnImage
            name="linedImg"
            img={column && column.attributes.linedImgUrl}
            label="Algorithmic Split"
          />
          <ColumnImage
            name="splitImg"
            img={column && column.attributes.splitImgUrl}
            label="Line Count Split"
          />
          <ColumnImage
            name="singleLineTable"
            label="Column as 67 split lines (for OCR)"
          >
            <Table />
          </ColumnImage>
          <ColumnImage
            name="singleLineTableText"
            label="OCR extracted text from 67 split line PDFs"
          />
          <ColumnImage
            name="columnText"
            label="OCR extracted text from raw column pdf"
          />
        </>
      )}
    </Box>
  )
}

export default Columns
