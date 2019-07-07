/** @format */

// @flow
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box, Heading, Form, FormField, TextInput, Text, Grid } from "grommet"
import { createPatent, fetchPatentNumbers } from "./_redux/patentActions"
import PatentForm from "./_form"
import PatentList from "./_list"
import ActivePatent from "./_patent"

const Home = ({
  match,
  size,
  fetchPatentNumbers,
  createPatent,
  patentNumbers,
}: {
  match: {},
  size: string,
  createPatent: number => void,
  fetchPatentNumbers: (?string) => void,
  patentNumbers: Array<Object>,
}) => (
  <Grid
    fill
    rows={["small", "auto"]}
    columns={["1/4", "3/4"]}
    areas={[
      { name: "form", start: [0, 0], end: [0, 0] },
      { name: "list", start: [0, 1], end: [0, 1] },
      { name: "main", start: [1, 0], end: [1, 1] },
    ]}
  >
    <Box gridArea="form" background="light-6">
      <PatentForm
        createPatent={createPatent}
        fetchPatentNumbers={fetchPatentNumbers}
        options={patentNumbers.map((pN, index) => pN.attributes.number)}
      />
    </Box>
    <Box pad="medium" align="center" gridArea="list" background="light-6">
      <PatentList />
    </Box>
    <Box gridArea="main" background="light-1">
      <ActivePatent />
    </Box>
  </Grid>
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
