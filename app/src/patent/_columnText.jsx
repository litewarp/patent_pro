/** @format */

// @flow
import * as React from "react"
import { Heading, Table, TableBody, TableRow, TableCell, Text } from "grommet"

const ColumnText = ({ textAsLines }: { textAsLines: Array<string> }) => (
  <Table>
    <TableBody>
      {textAsLines.map((line, index) => (
        <TableRow key={index + 22 * 3}>
          <TableCell scope="row">
            <strong>{index + 1}</strong>
          </TableCell>
          <TableCell>
            <Text size="medium">{line}</Text>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default ColumnText
