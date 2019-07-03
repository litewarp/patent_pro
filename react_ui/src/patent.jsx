/** @format */

// @flow
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box, Heading, Anchor } from "grommet"
import { fetchPatents } from "./_redux/patentActions"
import { BrowserRouter as Link } from "react-router-dom"

const List = ({
  patents,
  fetchPatents,
}: {
  patents: Array<Object>,
  fetchPatents: () => void,
}) => {
  React.useEffect(() => {
    fetchPatents()
  }, [])

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
})

const mapDispatch = dispatch => ({
  fetchPatents: bindActionCreators(fetchPatents, dispatch),
})

export default connect(
  mapState,
  mapDispatch,
)(List)
