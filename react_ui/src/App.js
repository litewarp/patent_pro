/** @format */
// @flow

import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { LinkNext, LinkPrevious } from "grommet-icons"
import { Box, Heading, Button, Anchor } from "grommet"
import {
  fetchColumns,
  fetchLines,
  setActiveColumn,
} from "./_redux/columnActions"
import ColumnTable from "./Table"

const App = ({
  activePatent,
  activeColumn,
  columns,
  loading,
  lines,
  fetchColumns,
  fetchLines,
  setActiveColumn,
}: {
  activePatent: number,
  activeColumn: number,
  columns: Array<Object>,
  lines: Array<Object>,
  loading: boolean,
  fetchColumns: ({}) => void,
  fetchLines: number => void,
  setActiveColumn: number => void,
}) => {
  // page options are form, list, patent
  const [page, setPage] = useState("patent")

  const downColumn = col => (col == 1 ? 1 : col - 1)
  const upColumn = col => (col == columns.length ? columns.length : col + 1)

  const columnIdFor = number => {
    const results = columns.filter(col => col.attributes.number == number)
    return results && results[0] && results[0].id
  }

  useEffect(() => {
    if (page === "patent") {
      console.log(page, activePatent)
      fetchColumns({ activePatent: "6091781" })
    }
  }, [])

  return (
    <Box fill pad="large" align="center">
      <Heading level={2}> PTO Patent PDF Parser Pro (Pre-Release) </Heading>
      <Box direction="row" fill="horizontal" justify="between" align="center">
        <Anchor
          label="Previous Column"
          icon={<LinkPrevious />}
          onClick={() => setActiveColumn(downColumn(activeColumn))}
        />
        <Heading level={3} pad="large">{`Column ${activeColumn}`}</Heading>
        <Anchor
          label="Next Column"
          icon={<LinkNext />}
          reverse={true}
          onClick={() => setActiveColumn(upColumn(activeColumn))}
        />
      </Box>
      <ColumnTable
        columnId={columnIdFor(activeColumn)}
        activeColumn={activeColumn}
        lines={lines}
        fetchLines={fetchLines}
      />
    </Box>
  )
}

const mapState = ({ layout, column }) => ({
  activePatent: column.activePatent,
  activeColumn: column.activeColumn,
  columns: column.columns,
  lines: column.lines,
  loading: column.loading,
})

const mapDispatch = dispatch => ({
  fetchColumns: bindActionCreators(fetchColumns, dispatch),
  fetchLines: bindActionCreators(fetchLines, dispatch),
  setActiveColumn: bindActionCreators(setActiveColumn, dispatch),
})

export default connect(
  mapState,
  mapDispatch,
)(App)
