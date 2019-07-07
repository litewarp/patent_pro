/** @format */

// @flow
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box, Heading, Anchor } from "grommet"
import { fetchPatents, loadPatent } from "./_redux/patentActions"
import { BrowserRouter as Link } from "react-router-dom"
import { toCommas } from "./_root/_helpers"

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
    <>
      <Heading level={2}>Parsed Patents</Heading>
      {patents &&
        patents.map((p, i) => (
          <Anchor
            key={`${i}_patent_${i}`}
            size="large"
            href={`/patents/${p.attributes.number}`}
            label={toCommas(p.attributes.number)}
          />
        ))}
    </>
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
