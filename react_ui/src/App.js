/** @format */
// @flow

import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { LinkNext, LinkPrevious } from "grommet-icons"
import { Box, Heading, Button, Anchor } from "grommet"
import { fetchColumns } from "./_redux/columnActions"

const App = ({
  activePatent,
  activeColumn,
  columns,
  loading,
  columnImages,
  fetchColumns,
}: {
  activePatent: number,
  activeColumn: number,
  columns: Array<Object>,
  loading: boolean,
  columnImages: Array<Object>,
  fetchColumns: ({}) => void,
}) => {
  // page options are form, list, patent
  const [page, setPage] = useState("patent")
  const [column, setColumn] = useState(1)

  const downColumn = col => (col == 1 ? 1 : col - 1)
  const upColumn = col => (col == columns.length ? columns.length : col + 1)

  useEffect(() => {
    if (page === "patent") {
      console.log(page, activePatent)
      fetchColumns({ activePatent, column })
    }
  }, [])

  return (
    <Box fill pad="large" align="center">
      <Heading level={2}> PTO Patent PDF Parser Pro (Pre-Release) </Heading>
      <Box direction="row" fill="horizontal" justify="between" align="center">
        <Anchor
          label="Previous Column"
          icon={<LinkPrevious />}
          onClick={() => setColumn(downColumn(column))}
        />
        <Heading level={3} pad="large">{`Column ${column}`}</Heading>
        <Anchor
          label="Next Column"
          icon={<LinkNext />}
          reverse={true}
          onClick={() => setColumn(upColumn(column))}
        />
      </Box>
    </Box>
  )
}

const mapState = ({ layout, column }) => ({
  activeColumn: column.activeColumn,
  activePatent: column.activePatent,
  columns: column.columns,
  images: column.images,
  loading: column.loading,
})

const mapDispatch = dispatch => ({
  fetchColumns: bindActionCreators(fetchColumns, dispatch),
})

export default connect(
  mapState,
  mapDispatch,
)(App)
