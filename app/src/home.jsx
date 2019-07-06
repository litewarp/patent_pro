/** @format */

// @flow
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box, Heading, Form, FormField, TextInput, Text } from "grommet"
import { createPatent, fetchPatentNumbers } from "./_redux/patentActions"
import PatentNumberForm from "./_form"

const Home = ({
  fetchPatentNumbers,
  createPatent,
  patentNumbers,
}: {
  createPatent: number => void,
  fetchPatentNumbers: (?string) => void,
  patentNumbers: Array<Object>,
}) => (
  <>
    <Heading level={2}> PTO Patent PDF Parser Pro (Pre-Release) </Heading>
    <Heading level={4}>Enter a US Patent Number</Heading>
    <PatentNumberForm
      createPatent={createPatent}
      fetchPatentNumbers={fetchPatentNumbers}
      options={patentNumbers.map((pN, index) => pN.attributes.number)}
    />
  </>
)

const mapState = ({ patent }) => ({
  patentNumbers: patent.patentNumbers,
})

const mapDispatch = dispatch => ({
  createPatent: bindActionCreators(createPatent, dispatch),
  fetchPatentNumbers: bindActionCreators(fetchPatentNumbers, dispatch),
})

export default connect(
  mapState,
  mapDispatch,
)(Home)
