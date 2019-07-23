/** @format */
// @flow

import * as React from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { Grid } from "grommet"
import { actions as patentActions } from "../_redux/patentActions"

import Columns from "./columns"
import Controls from "./controls"

const Patent = ({
  match,
  history,
}: {
  match: { params: { id: string } },
  history: { push: string => void },
}) => {
  const { loadColumns } = patentActions

  const dispatch = useDispatch()
  const columns = useSelector(({ patent }) => patent.columns, shallowEqual)
  const activePatent = useSelector(({ patent }) => patent.activePatent)
  const [activeColumn, setActiveColumn] = React.useState(1)
  const [visibleItems, setVisibleItems] = React.useState([
    "rawImg",
    "fuzzyMatch",
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
        activePatent={activePatent}
        setActiveColumn={setActiveColumn}
        visibleItems={visibleItems}
        setVisibleItems={setVisibleItems}
      />
    </Grid>
  )
}

export default Patent
