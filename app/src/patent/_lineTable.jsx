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
import { useSelector, useDispatch } from "react-redux"

import { fetchLines } from "../_redux/columnActions"
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
  max-height: 20px;
`
const NoLineHeightRow = styled(TableRow)`
  line-height: 0em;
`
const LineTable = ({ columnId }: { columnId: number }) => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    const loadLines = id => dispatch(fetchLines(id))
    loadLines(columnId)
  }, [columnId])

  const lines = useSelector(({ column }) => column.lines)
  console.log(lines)
  return (
    <Box basis="1/2" align="center">
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

export default LineTable
