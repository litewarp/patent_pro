/** @format */

// @flow
import * as React from "react"
import { Table, TableBody, TableRow, TableCell, Text } from "grommet"
import styled from "styled-components"

const StyledTableCell = styled.td`
  padding: 0;
  margin: 0;
`

const StyledTableHeader = styled.th`
  padding: 0 1em;
  margin: 0;
`

const ResizedText = styled(Text)`
  font-size: 1rem;
`

const ColumnText = ({ textAsLines }: { textAsLines: Array<string> }) => (
  <Table>
    <TableBody>
      {!!textAsLines &&
        textAsLines.map((line, index) => (
          <TableRow key={index + 22 * 3}>
            <StyledTableHeader>
              <strong>{index + 1}</strong>
            </StyledTableHeader>
            <StyledTableCell>
              <ResizedText>{line}</ResizedText>
            </StyledTableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
)

export default ColumnText
