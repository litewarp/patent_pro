/** @format */

// @flow
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box, Heading, Anchor } from "grommet"
import { fetchPatents, loadPatent } from "./_redux/patentActions"
import { BrowserRouter as Link } from "react-router-dom"

const PatentList = ({
  activePatent,
  patents,
  fetchPatents,
  loadPatent,
}: {
  activePatent: {
    id: number,
  },
  patents: Array<Object>,
  fetchPatents: () => void,
  loadPatent: number => void,
}) => {
  React.useEffect(() => {
    fetchPatents()
  }, [])

  React.useEffect(() => {
    if (!activePatent || !activePatent.id) {
      if (patents[0] && patents[0].id) {
        loadPatent(patents[0].attributes.number)
      }
    }
  }, [patents[0]])

  return (
    <Box align="center">
      <Heading level={2}>Parsed Patents</Heading>
      {patents &&
        patents.map((p, i) => (
          <Anchor
            size="large"
            href={`/patents/${p.attributes.number}`}
            label={p.attributes.number}
          />
        ))}
    </Box>
  )
}

const mapState = ({ patent }) => ({
  patents: patent.patents,
  activePatent: patent.activePatent,
})

const mapDispatch = dispatch => ({
  loadPatent: bindActionCreators(loadPatent, dispatch),
  fetchPatents: bindActionCreators(fetchPatents, dispatch),
})

export default connect(
  mapState,
  mapDispatch,
)(PatentList)
