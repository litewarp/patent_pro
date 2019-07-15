/** @format */

import * as React from "react"
import {
  Box,
  Heading,
  Image,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Text,
  Paragraph,
} from "grommet"
import Loading from "./_loading"
import ColumnImage from "./columnImage"
import ColumnText from "./_columnText"
import LineTable from "./_lineTable"
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

  const textAsLines =
    column && column.attributes && column.attributes.text.split("\n")

  if (!(column && column.attributes)) {
    return <Loading />
  } else {
    return (
      <Box fill gridArea="body" direction="row" pad="medium" justify="between">
        <ColumnImage
          width="1/4"
          isVisible={isVisible("rawImg")}
          img={column && column.attributes.masterImgUrl}
          label="Raw Image"
        >
          <Image fit="contain" src={column && column.attributes.masterImgUrl} />
        </ColumnImage>
        <ColumnImage
          width="1/4"
          isVisible={isVisible("linedImg")}
          img={column && column.attributes.linedImgUrl}
          label="Whitespace Calculated Lines"
        >
          <Image fit="contain" src={column && column.attributes.linedImgUrl} />
        </ColumnImage>
        <ColumnImage
          width="1/4"
          isVisible={isVisible("splitImg")}
          img={column && column.attributes.splitImgUrl}
          label="Raw split into 67 rows"
        >
          <Image fit="contain" src={column && column.attributes.splitImgUrl} />
        </ColumnImage>
        <ColumnImage
          width="1/4"
          isVisible={isVisible("singleLineTable")}
          label="Raw split lines with OCR"
        >
          <LineTable columnId={column.id} />
        </ColumnImage>
        <ColumnImage
          width="1/4"
          isVisible={isVisible("columnText")}
          label="Raw column text"
        >
          <Heading level={4}>{`${
            textAsLines.length
          } lines found: ${textAsLines.length - 67} extraneous`}</Heading>
          <ColumnText textAsLines={textAsLines} />
        </ColumnImage>
      </Box>
    )
  }
}

export default Columns
