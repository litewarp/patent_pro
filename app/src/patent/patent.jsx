/** @format */
// @flow

import React, { useState, useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { LinkNext, LinkPrevious } from "grommet-icons"
import { Box, Grid } from "grommet"
import { actions as patentActions } from "../_redux/patentActions"
import { actions as columnActions } from "../_redux/columnActions"
import { toCommas } from "../_root/_helpers"

import Columns from "./columns"
import Controls from "./controls"

const Patent = ({ match }: { match: { params: { id: string } } }) => {
  const { loadColumns, loadPatents } = patentActions
  const { fetchLines } = columnActions

  const dispatch = useDispatch()
  const lines = useSelector(({ column }) => column.lines, shallowEqual)
  const loading = useSelector(({ patent }) => patent.loading, shallowEqual)
  const patents = useSelector(({ patent }) => patent.patents, shallowEqual)
  const columns = useSelector(({ patent }) => patent.columns, shallowEqual)

  const [activeColumn, setActiveColumn] = React.useState(1)
  const [visibleItems, setVisibleItems] = React.useState([
    "rawImg",
    "columnText",
  ])
  const increment = () =>
    setActiveColumn(
      activeColumn == columns.length ? columns.length : activeColumn + 1,
    )
  const decrement = () =>
    setActiveColumn(activeColumn == 1 ? 1 : activeColumn - 1)

  const { id } = match.params

  React.useEffect(() => {
    const fetchPatent = (id: string) => dispatch(loadColumns(id))
    fetchPatent(id)
  }, [id])

  return (
    <Grid
      fill
      rows={["xsmall", "3/4"]}
      columns={["1/2", "1/2"]}
      areas={[
        { name: "header", start: [0, 0], end: [1, 0] },
        { name: "body", start: [0, 1], end: [1, 1] },
      ]}
    >
      <Controls
        activeColumn={activeColumn}
        setActiveColumn={setActiveColumn}
        increment={increment}
        decrement={decrement}
        columnsLength={columns.length || 0}
        visibleItems={visibleItems}
        setVisibleItems={setVisibleItems}
      />
      <Columns
        activeColumn={activeColumn}
        columns={columns}
        setActiveColumn={setActiveColumn}
        visibleItems={visibleItems}
        setVisibleItems={setVisibleItems}
      />
    </Grid>
  )
}

export default Patent
