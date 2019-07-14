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
  Paragraph,
} from "grommet"
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

  const textAsLines =
    column && column.attributes && column.attributes.text.split("\n")
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
        justify="between"
      >
        <ColumnImage
          width="1/3"
          isVisible={isVisible("rawImg")}
          img={column && column.attributes.masterImgUrl}
          label="Raw Image"
        >
          <Image fit="contain" src={column && column.attributes.masterImgUrl} />
        </ColumnImage>
        <ColumnImage
          width="1/3"
          isVisible={isVisible("linedImg")}
          img={column && column.attributes.linedImgUrl}
          label="Algorithmic Split"
        >
          <Image fit="contain" src={column && column.attributes.linedImgUrl} />
        </ColumnImage>
        <ColumnImage
          width="1/3"
          isVisible={isVisible("splitImg")}
          img={column && column.attributes.splitImgUrl}
          label="Line Count Split"
        >
          <Image fit="contain" src={column && column.attributes.splitImgUrl} />
        </ColumnImage>
        <ColumnImage
          width="1/3"
          isVisible={isVisible("singleLineTable")}
          label="Column as 67 split lines (for OCR)"
        >
          <Table />
        </ColumnImage>
        <ColumnImage
          width="1/3"
          isVisible={isVisible("singleLineTableText")}
          label="OCR extracted text from 67 split line PDFs"
        />
        <ColumnImage
          width="1/3"
          isVisible={isVisible("columnText")}
          label="OCR extracted text from raw column pdf"
        >
          <Heading level={4}>{`${
            textAsLines.length
          } lines found: ${textAsLines.length - 67} extraneous`}</Heading>
          <Table>
            <TableBody>
              {textAsLines.map((line, index) => (
                <TableRow key={index + 22 * 3}>
                  <TableCell scope="row">
                    <strong>{index + 1}</strong>
                  </TableCell>
                  <TableCell>{line}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ColumnImage>
      </Box>
    )
  }
}

export default Columns
