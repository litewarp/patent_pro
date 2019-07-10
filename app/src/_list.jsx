/** @format */

// @flow
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box, Heading, Anchor } from "grommet"
import { FormTrash } from "grommet-icons"
import {
  deletePatent,
  fetchPatents,
  loadPatentAndColumns,
} from "./_redux/patentActions"
import { BrowserRouter as Link } from "react-router-dom"
import { toCommas } from "./_root/_helpers"

const PatentList = ({
  activePatent,
  patents,
  deletePatent,
  fetchPatents,
  loadPatentAndColumns,
}: {
  activePatent: {
    id: number,
  },
  patents: Array<Object>,
  deletePatent: number => void,
  fetchPatents: () => void,
  loadPatentAndColumns: number => void,
}) => {
  React.useEffect(() => {
    fetchPatents()
  }, [])

  React.useEffect(() => {
    if (!activePatent || !activePatent.id) {
      if (patents[0] && patents[0].id) {
        loadPatentAndColumns(patents[0].attributes.number)
      }
    }
  }, [patents[0]])

  return (
    <Box basis="3/4">
      <Heading level={3}>Parsed Patents</Heading>
      {patents &&
        patents.map((p, i) => (
          <Box gap="small" direction="row">
            <FormTrash onClick={() => deletePatent(p.id)} />
            <Anchor
              key={`${i}_patent_${i}`}
              size="large"
              onClick={() => loadPatentAndColumns(p.attributes.number)}
              label={toCommas(p.attributes.number)}
            />
          </Box>
        ))}
    </Box>
  )
}

const mapState = ({ patent }) => ({
  patents: patent.patents,
  activePatent: patent.activePatent,
})

const mapDispatch = dispatch => ({
  deletePatent: bindActionCreators(deletePatent, dispatch),
  loadPatentAndColumns: bindActionCreators(loadPatentAndColumns, dispatch),
  fetchPatents: bindActionCreators(fetchPatents, dispatch),
})

export default connect(
  mapState,
  mapDispatch,
)(PatentList)
