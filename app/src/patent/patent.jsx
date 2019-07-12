/** @format */
// @flow

import React, { useState, useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { bindActionCreators } from "redux"
import { LinkNext, LinkPrevious } from "grommet-icons"
import { Box, Heading, Button, Anchor } from "grommet"
import { fetchLines, setActiveColumn } from "../_redux/columnActions"
import { actions as patentActions } from "../_redux/patentActions"
import { actions as columnActions } from "../_redux/columnActions"
import { toCommas } from "../_root/_helpers"
import styled from "styled-components"

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

  const { fetchLines, setActiveColumn } = columnActions
  const dispatch = useDispatch()
  const loading = useSelector(({ patent }) => patent.loading)
  const patents = useSelector(({ patent }) => patent.patents)
  const activePatent = useSelector(({ patent }) => patent.activePatent)
  const activeColumn = useSelector(({ column }) => column.activeColumn)
  const columns = useSelector(({ column }) => column.columns, shallowEqual)
  const lines = useSelector(({ column }) => column.lines, shallowEqual)

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
    patentNumberToLoad && loadColumns(patentNumberToLoad)
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
    </>
  )
}

export default Patent
