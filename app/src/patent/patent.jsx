/** @format */
// @flow

import * as React from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { LinkNext, LinkPrevious } from "grommet-icons"
import { Box, Heading, Anchor, Select } from "grommet"
import { actions as patentActions } from "../_redux/patentActions"
import { actions as columnActions } from "../_redux/columnActions"
import styled from "styled-components"
import Columns from "./columns"

const Patent = () => {
  // localState and loadColumns
  const [activeColumn, setActiveColumn] = React.useState(1)

  const pathname = useSelector(({ router }) => router, shallowEqual)
  console.log(pathname)
  const dispatch = useDispatch()

  //  React.useEffect(() => {
  //  const getPatent = x => dispatch(patentActions.loadColumns(x))
  //  getPatent(id)
  // }, [id])
  // fetch props from redux
  const patent = useSelector(({ patent }) => patent, shallowEqual)
  // destructure
  const {
    loading,
    patents,
    activePatent,
    apiError,
    errorMessage,
    columns,
  } = patent
  // helpers
  const downColumn = col => (col === 1 ? 1 : col - 1)
  const upColumn = col => (col === columns.length ? columns.length : col + 1)
  //local state && lifecycle

  //styles
  const StyledAnchor = styled(Anchor)`
    height: 24px;
  `
  //render
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
        <Select
          options={[...Array(columns.length).keys()]}
          value={activeColumn}
          onChange={({ option }) => setActiveColumn(option)}
        />
        <StyledAnchor
          color="dark-6"
          label="Next Column"
          icon={<LinkNext />}
          reverse={true}
          onClick={() => setActiveColumn(upColumn(activeColumn))}
        />
      </Box>
      <Columns activeColumn={activeColumn} columns={columns} />
    </>
  )
}

export default Patent
