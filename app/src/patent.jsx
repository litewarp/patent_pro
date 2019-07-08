/** @format */
// @flow

import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { LinkNext, LinkPrevious } from "grommet-icons"
import { Box, Heading, Button, Anchor } from "grommet"
import { fetchLines, setActiveColumn } from "./_redux/columnActions"
import { loadPatentAndColumns } from "./_redux/patentActions"
import ColumnTable from "./table"
import { toCommas } from "./_root/_helpers"
import styled from "styled-components"
const ActivePatent = ({
  activePatent,
  activeColumn,
  columns,
  loading,
  lines,
  match,
  loadPatentAndColumns,
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
  loadPatentAndColumns: number => void,
  loading: boolean,
  patents: Array<{}>,
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

  const patentNumberToLoad = match
    ? match.params.id
    : !activePatent
    ? patents[0] && patents[0].attributes && patents[0].attributes.number
    : null

  React.useEffect(() => {
    patentNumberToLoad && loadPatentAndColumns(patentNumberToLoad)
  }, [patents[0]])

  const commaNumber = activePatent && toCommas(activePatent.attributes.number)

  const StyledAnchor = styled(Anchor)`
    height: 24px;
  `

  return (
    <>
      <Box
        pad="medium"
        gridArea="head"
        background="dark-3"
        direction="row"
        align="center"
        justify="between"
      >
        <StyledAnchor
          color="dark-6"
          label="Previous Column"
          icon={<LinkPrevious />}
          onClick={() => setActiveColumn(downColumn(activeColumn))}
        />
        <Heading level={3} size="small" margin="none" pad="none">
          {`Column ${activeColumn}`}
        </Heading>
        <StyledAnchor
          color="dark-6"
          label="Next Column"
          icon={<LinkNext />}
          reverse={true}
          onClick={() => setActiveColumn(upColumn(activeColumn))}
        />
      </Box>
      <Box direction="row" gridArea="main">
        <ColumnTable
          lines={lines}
          columnId={activeColumn}
          fetchLines={fetchLines}
        />
      </Box>
    </>
  )
}

const mapState = ({ column, patent }) => ({
  activePatent: patent.activePatent,
  columns: patent.columns,
  patents: patent.patents,
  lines: column.lines,
  activeColumn: column.activeColumn,
  loading: column.loading,
})

const mapDispatch = dispatch => ({
  loadPatentAndColumns: bindActionCreators(loadPatentAndColumns, dispatch),
  fetchLines: bindActionCreators(fetchLines, dispatch),
  setActiveColumn: bindActionCreators(setActiveColumn, dispatch),
})

export default connect(
  mapState,
  mapDispatch,
)(ActivePatent)
