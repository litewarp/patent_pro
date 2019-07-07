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
import styled from "styled-components"

const lineArray = () => {
  const lineText = []
  const lineImage = []
  lineText.map((li, index) => ({
    itemNumber: index + 1,
    lineText: li,
    lineImage: lineImage(index + 1),
  }))
}

const FixedImage = styled(Image)`
  height: 15px;
`

const NoLineHeightRow = styled(TableRow)`
  line-height: 0em;
`

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
    columnId && fetchLines(columnId)
  }, [columnId])

  return (
    <Box align="center" pad="large">
      <Table caption="Column Table">
        <TableBody>
          {lines.map((line, index) => (
            <NoLineHeightRow key={line.id}>
              <TableCell>
                <Text size="small">{index + 1}</Text>
              </TableCell>
              <TableCell>
                <FixedImage src={line.attributes.image} />
              </TableCell>
              <TableCell>
                <Text size="small">{line.attributes.text}</Text>
              </TableCell>
            </NoLineHeightRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default ColumnTable
