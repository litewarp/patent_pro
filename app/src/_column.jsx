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
import ColumnTable from "./table"

const ActiveColumn = ({
  activePatent,
  activeColumn,
  columns,
  loading,
  lines,
  match,
  fetchColumns,
  fetchPatents,
  fetchLines,
  patents,
  setActiveColumn,
}: {
  activePatent: { id: number },
  activeColumn: number,
  columns: Array<Object>,
  lines: Array<Object>,
  match: {
    params: {
      id: string,
    },
  },
  loading: boolean,
  patents: Array<{}>,
  fetchColumns: ({}) => void,
  fetchLines: number => void,
  fetchPatents: () => void,
  setActiveColumn: number => void,
}) => {
  const downColumn = col => (col == 1 ? 1 : col - 1)
  const upColumn = col => (col == columns.length ? columns.length : col + 1)

  const columnIdFor = number => {
    const results = columns.filter(col => col.attributes.number == number)
    return results && results[0] && results[0].id
  }

  useEffect(() => {
    fetchColumns(activePatent.id)
  }, [activePatent])

  return (
    <>
      <Heading
        level={2}
        pad="large"
      >{`U.S. Patent No. ${match.params.id}`}</Heading>
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
    </>
  )
}

const mapState = ({ column, patent }) => ({
  activePatent: column.activePatent,
  activeColumn: column.activeColumn,
  columns: column.columns,
  patents: patent.patents,
  lines: column.lines,
  loading: column.loading,
})

const mapDispatch = dispatch => ({
  fetchPatents: bindActionCreators(fetchColumns, dispatch),
  fetchColumns: bindActionCreators(fetchColumns, dispatch),
  fetchLines: bindActionCreators(fetchLines, dispatch),
  setActiveColumn: bindActionCreators(setActiveColumn, dispatch),
})

export default connect(
  mapState,
  mapDispatch,
)(ActiveColumn)
