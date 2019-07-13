/** @format */
// @flow

import React, { useState, useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { LinkNext, LinkPrevious } from "grommet-icons"
import { Box, Heading, Button, Anchor, Image } from "grommet"
import { actions as patentActions } from "../_redux/patentActions"
import { actions as columnActions } from "../_redux/columnActions"
import { toCommas } from "../_root/_helpers"
import styled from "styled-components"
import Columns from "./columns"

const Patent = ({
  match,
}: {
  match: {
    params: {
      id: string,
    },
  },
}) => {
  const { loadColumns, loadPatents } = patentActions
  const { fetchLines } = columnActions

  const dispatch = useDispatch()

  const loading = useSelector(({ patent }) => patent.loading, shallowEqual)
  const patents = useSelector(({ patent }) => patent.patents, shallowEqual)
  const activePatent = useSelector(
    ({ patent }) => patent.activePatent,
    shallowEqual,
  )
  const columns = useSelector(({ patent }) => patent.columns, shallowEqual)
  const lines = useSelector(({ column }) => column.lines, shallowEqual)

  const [activeColumn, setActiveColumn] = React.useState(1)

  const downColumn = col => (col == 1 ? 1 : col - 1)
  const upColumn = col => (col == columns.length ? columns.length : col + 1)

  const imgSource = columns && columns[2] && columns[2].attributes.linedImgUrl

  const patentNumberToLoad = match && match.params.id

  React.useEffect(() => {
    patentNumberToLoad && dispatch(loadColumns(patentNumberToLoad))
  }, [])

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
      <Columns activeColumn={activeColumn} columns={columns} />
    </>
  )
}

export default Patent
