/** @format */

// @flow

import * as React from "react"
import {
  Box,
  Image,
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  Text,
} from "grommet"
import { fetchLines } from "./_redux/columnActions"

const lineArray = () => {
  const lineText = []
  const lineImage = []
  lineText.map((li, index) => ({
    itemNumber: index + 1,
    lineText: li,
    lineImage: lineImage(index + 1),
  }))
}

const ColumnTable = ({
  lines,
  columnId,
  fetchLines,
}: {
  text: string,
  lines: [],
  columnId: number,
  fetchLines: number => void,
}) => {
  React.useEffect(() => {
    fetchLines(columnId)
  }, [columnId])

  return (
    <Box align="center" pad="large">
      <Table caption="Column Table">
        <TableBody>
          {lines.map((line, index) => (
            <TableRow key={line.id}>
              <TableCell>
                <Text>{index + 1}</Text>
              </TableCell>
              <TableCell>
                <Image src={line.attributes.image} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default ColumnTable
